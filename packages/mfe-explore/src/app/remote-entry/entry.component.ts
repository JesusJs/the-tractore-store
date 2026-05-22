import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductCardComponent } from '@the-tractor-store/ts-design-system';
import { Tractor } from '@the-tractor-store/shared-catalog';

/** Hero category card data */
interface HeroCategory {
  id: string;
  label: string;
  sublabel: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-mfe_explore-entry',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: 'entry.component.html',
  styleUrl: './entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {

  private readonly router = inject(Router);

  // ── Hero categories ──────────────────────────────────────────────
  readonly heroCategories: HeroCategory[] = [
    {
      id:       'classic',
      label:    'Classic Tractors',
      sublabel: 'Heritage machinery with proven reliability',
      image:    'images/hero-classic.png',
      route:    'mfe_decide',
    },
    {
      id:       'autonomous',
      label:    'Autonomous Tractors',
      sublabel: 'Next-generation precision agriculture',
      image:    'images/hero-autonomous.png',
      route:    'mfe_decide',
    },
  ];

  // ── Recommendation catalog ───────────────────────────────────────
  readonly recommendations: Tractor[] = [
    {
      id:          'ts-silver-500',
      name:        'Silver Streak 500',
      brand:       'CAT',
      price:       78500,
      image:       'images/tractor-1.png',
      variants:    ['Standard Tracks', 'Wide-Gauge Tracks', 'Snow Edition'],
      description: 'Heavy-duty tracked powerhouse. Engineered for extreme terrain with unmatched traction and endurance.',
      enginePower: '180 HP',
      stock:       12,
    },
    {
      id:          'ts-nordic-ed16',
      name:        'Nordic Sower ED-16',
      brand:       'Eicher',
      price:       42000,
      image:       'images/tractor-2.png',
      variants:    ['Classic Wheels', 'Wide-Base 4WD'],
      description: 'Scandinavian engineering meets classical form. Ideal for grain and root crop cultivation on varied terrain.',
      enginePower: '75 HP',
      stock:       8,
    },
    {
      id:          'ts-green-compact',
      name:        'Green Compact 2025SR',
      brand:       'John Deere',
      price:       35200,
      image:       'images/tractor-3.png',
      variants:    ['Front Loader', 'Backhoe Combo', 'Standard'],
      description: 'Versatile utility tractor for diverse farm operations. Compact size with maximum capability and comfort.',
      enginePower: '55 HP',
      stock:       20,
    },
    {
      id:          'ts-massey-vintage',
      name:        'Heritage Ferguson S',
      brand:       'Massey Ferguson',
      price:       28900,
      image:       'images/tractor-4.png',
      variants:    ['Restored Classic', 'Working Condition'],
      description: 'An icon of agricultural history, fully restored to working condition with original manufacturer parts.',
      enginePower: '45 HP',
      stock:       4,
    },
  ];

  // ── Variant state per product ─────────────────────────────────────
  readonly selectedVariants = signal<Record<string, string>>({});

  // ── Navigation ────────────────────────────────────────────────────
  navigateToCategory(route: string): void {
    this.router.navigate([route]);
  }

  // ── Cart handler ──────────────────────────────────────────────────
  onAddToCart(event: { id: string; variant: string }): void {
    console.log('[mfe-explore] Add to cart:', event);
  }

  // ── Variant helpers ───────────────────────────────────────────────
  getVariant(productId: string): string {
    return this.selectedVariants()[productId] ?? '';
  }

  setVariant(productId: string, variant: string): void {
    this.selectedVariants.update(prev => ({ ...prev, [productId]: variant }));
  }
}

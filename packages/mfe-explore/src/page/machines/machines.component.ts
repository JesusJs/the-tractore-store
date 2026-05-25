import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService, CartService } from '@the-tractor-store/shared-catalog';
import { Tractor } from '@the-tractor-store/shared-catalog';
import { ProductCardComponent, ButtonComponent } from '@the-tractor-store/ts-design-system';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, ButtonComponent],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogService = inject(CatalogService);
  private cartService = inject(CartService);

  public products = signal<Tractor[]>([]);
  public availableFilters = signal<string[]>(['all', 'classics', 'autonomous']);
  public selectedFilter = signal<string>('all');
  public isLoading = signal(true);

  public readonly pageTitle = () => {
    const f = this.selectedFilter();
    if (f === 'classics') return 'Classic Tractors';
    if (f === 'autonomous') return 'Autonomous Tractors';
    return 'All Tractors';
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filter = params['filter'] || 'all';
      this.selectedFilter.set(filter);
      this.loadCategory(filter);
    });

    // Also load the cart so the guard works
    this.cartService.loadCart().subscribe();
  }

  private loadCategory(filter: string): void {
    this.isLoading.set(true);
    this.catalogService.getCategory(filter).subscribe({
      next: (data) => {
        this.products.set(data.products);
        this.availableFilters.set(data.availableFilters);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  public setFilter(filter: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter },
      queryParamsHandling: 'merge',
    });
  }

  public onAddToCart(event: { id: string; variant: string }): void {
    this.cartService.addToCart(event.variant).subscribe({
      error: (err) => console.error('Failed to add to cart', err),
    });
  }
}

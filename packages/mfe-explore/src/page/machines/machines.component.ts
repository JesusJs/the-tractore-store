import { ChangeDetectionStrategy, Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

export interface Tractor {
  id: string;
  name: string;
  price: string;
  image: string;
  type: 'classics' | 'autonomous';
}

@Component({
  selector: 'app-machines',
  imports: [CommonModule, RouterLink],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public readonly allProducts: Tractor[] = [
    { id: 'tx-001', name: 'Sapphire Sunworker 460R', price: '8500,00 Ø', image: 'placeholder_tractor.jpg', type: 'autonomous' },
    { id: 'tx-002', name: 'Field Pioneer', price: '4500,00 Ø', image: 'placeholder_tractor.jpg', type: 'classics' },
    { id: 'tx-003', name: 'SmartFarm Titan', price: '4000,00 Ø', image: 'placeholder_tractor.jpg', type: 'autonomous' }
  ];

  public selectedFilter = signal<'all' | 'classics' | 'autonomous'>('all');

  public readonly filteredProducts = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') {
      return this.allProducts;
    }
    return this.allProducts.filter(p => p.type === filter);
  });

  public readonly pageTitle = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return 'All Tractors';
    if (filter === 'classics') return 'Classic Tractors';
    return 'Autonomous Tractors';
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filter = params['filter'];
      if (filter === 'classics' || filter === 'autonomous') {
        this.selectedFilter.set(filter);
      } else {
        this.selectedFilter.set('all');
      }
    });
  }

  public setFilter(filter: 'all' | 'classics' | 'autonomous'): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter },
      queryParamsHandling: 'merge'
    });
  }
}

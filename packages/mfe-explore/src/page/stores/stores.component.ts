import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService, StoreLocation } from '@the-tractor-store/shared-catalog';

@Component({
  selector: 'app-stores',
  imports: [CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {
  private catalogService = inject(CatalogService);

  public stores = signal<StoreLocation[]>([]);
  public isLoading = signal(true);

  constructor() {
    this.catalogService.getStores().subscribe({
      next: (data) => {
        this.stores.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}

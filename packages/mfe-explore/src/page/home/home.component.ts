import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogService, CategoryTeaser } from '@the-tractor-store/shared-catalog';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private catalogService = inject(CatalogService);

  public teasers = signal<CategoryTeaser[]>([]);
  public isLoading = signal(true);

  constructor() {
    this.catalogService.getHome().subscribe({
      next: (data) => {
        this.teasers.set(data.teasers);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}

import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Recommendation } from '@the-tractor-store/shared-catalog';

@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecomendationsComponent implements OnInit {
  private productService = inject(ProductService);
  public recommendations = signal<Recommendation[]>([]);
  public isLoading = signal(true);

  ngOnInit(): void {
    this.productService.getRecommendations([]).subscribe({
      next: (recs) => {
        this.recommendations.set(recs);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
        this.isLoading.set(false);
      }
    });
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
}


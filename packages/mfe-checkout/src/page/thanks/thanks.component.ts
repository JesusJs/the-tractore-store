import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, OrderReceipt } from '@the-tractor-store/shared-catalog';
import { ButtonComponent } from '@the-tractor-store/ts-design-system';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss',
})
export class ThanksPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);

  public order = signal<OrderReceipt | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParams['orderId'];
    if (orderId) {
      this.cartService.getOrder(orderId).subscribe({
        next: (data) => {
          this.order.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Could not load order details.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }

  public continueShopping(): void {
    this.router.navigate(['/mfe_explore']);
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
}

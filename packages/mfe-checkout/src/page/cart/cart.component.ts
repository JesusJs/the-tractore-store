import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '@the-tractor-store/shared-catalog';
import { ButtonComponent } from '@the-tractor-store/ts-design-system';
import { CartItem } from '@the-tractor-store/shared-catalog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartPageComponent implements OnInit {
  protected cartService = inject(CartService);
  private router = inject(Router);

  public isLoading = signal(true);
  public removingSkus = signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.cartService.loadCart().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }

  public removeItem(sku: string): void {
    const set = new Set(this.removingSkus());
    set.add(sku);
    this.removingSkus.set(set);

    this.cartService.removeFromCart(sku).subscribe({
      next: () => {
        const updated = new Set(this.removingSkus());
        updated.delete(sku);
        this.removingSkus.set(updated);
      },
      error: () => {
        const updated = new Set(this.removingSkus());
        updated.delete(sku);
        this.removingSkus.set(updated);
      },
    });
  }

  public goToCheckout(): void {
    this.router.navigate(['/mfe_checkout/checkout']);
  }

  public continueShopping(): void {
    this.router.navigate(['/mfe_explore']);
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  public trackBySku(_: number, item: CartItem): string {
    return item.variantId;
  }

  public isRemoving(sku: string): boolean {
    return this.removingSkus().has(sku);
  }
}

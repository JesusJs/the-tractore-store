import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CartService,
  ProductService,
  ProductDetail,
  Recommendation,
  InventoryStatus,
} from '@the-tractor-store/shared-catalog';
import {
  ButtonComponent,
  VariantOptionComponent,
} from '@the-tractor-store/ts-design-system';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, VariantOptionComponent],
  selector: 'app-mfe_decide-entry',
  templateUrl: 'entry.component.html',
  styleUrl: 'entry.component.scss',
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  protected cartService = inject(CartService);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>();

  public product = signal<ProductDetail | null>(null);
  public selectedVariant = signal<string>('');
  public inventory = signal<InventoryStatus | null>(null);
  public recommendations = signal<Recommendation[]>([]);
  public isLoadingInventory = signal(false);
  public isAddingToCart = signal(false);
  public addedToCart = signal(false);
  public quantity = signal<number>(1);

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ resolvedProduct }) => {
        if (resolvedProduct) {
          this.product.set(resolvedProduct);
          // Pre-select first variant or use product ID as SKU
          const firstVariant = resolvedProduct.variants?.[0] ?? resolvedProduct.id;
          this.selectedVariant.set(firstVariant);
          if (firstVariant) {
            this.loadInventory(firstVariant);
          }
          this.quantity.set(1);
          this.addedToCart.set(false);
          // Load recommendations
          this.loadRecommendations(resolvedProduct.variants);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onVariantSelected(sku: string): void {
    this.selectedVariant.set(sku);
    this.loadInventory(sku);
    this.addedToCart.set(false);
    this.quantity.set(1);
  }

  public increaseQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  public decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  private loadInventory(sku: string): void {
    this.isLoadingInventory.set(true);
    this.productService.getInventory(sku)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (inv) => {
          this.inventory.set(inv);
          this.isLoadingInventory.set(false);
        },
        error: () => this.isLoadingInventory.set(false),
      });
  }

  private loadRecommendations(variants: string[]): void {
    this.productService.getRecommendations(variants)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (recs) => this.recommendations.set(recs),
        error: () => {},
      });
  }

  public addToCart(): void {
    const sku = this.selectedVariant();
    const qty = this.quantity();
    if (!sku || qty < 1) return;
    this.isAddingToCart.set(true);

    const requests = Array.from({ length: qty }).map(() => sku);

    import('rxjs').then(({ from }) => {
      import('rxjs/operators').then(({ concatMap, toArray }) => {
        from(requests).pipe(
          concatMap(s => this.cartService.addToCart(s)),
          toArray(),
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.isAddingToCart.set(false);
            this.addedToCart.set(true);
            this.quantity.set(1);
            setTimeout(() => this.addedToCart.set(false), 3000);
          },
          error: () => this.isAddingToCart.set(false),
        });
      });
    });
  }

  public get stockLabel(): string {
    if (this.isLoadingInventory()) return 'Checking stock…';
    const inv = this.inventory();
    if (!inv) return '';
    return inv.stock > 0
      ? `${inv.stock} in stock – free shipping`
      : 'Out of stock';
  }

  public get isOutOfStock(): boolean {
    const inv = this.inventory();
    return inv !== null && inv.stock === 0;
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
}

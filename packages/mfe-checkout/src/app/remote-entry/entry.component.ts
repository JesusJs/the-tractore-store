import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '@the-tractor-store/shared-catalog';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-mfe_checkout-entry',
  templateUrl: 'entry.component.html',
  styleUrl: 'entry.component.scss'
})
export class RemoteEntryComponent implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);

  public isModalOpen = signal(false);
  public selectedStoreId = signal('');
  public orderPlaced = signal(false);

  public stores = [
    { id: 'aurora-arlington', name: 'Aurora Flagship Store', city: 'Arlington' },
    { id: 'big-micro-burlington', name: 'Big Micro Machines', city: 'Burlington' }
  ];

  ngOnInit(): void {
    if (this.router.url.includes('/thanks')) {
      this.orderPlaced.set(true);
    }
  }

  public openModal(): void {
    this.isModalOpen.set(true);
  }

  public closeModal(): void {
    this.isModalOpen.set(false);
  }

  public selectStore(storeId: string): void {
    this.selectedStoreId.set(storeId);
    this.closeModal();
  }

  public onStoreIdInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedStoreId.set(value);
  }

  public placeOrder(): void {
    if (this.selectedStoreId()) {
      this.cartService.clearCart();
      this.router.navigate(['/mfe_checkout/thanks']);
    }
  }

  public continueShopping(): void {
    this.router.navigate(['/mfe_explore']);
  }
}

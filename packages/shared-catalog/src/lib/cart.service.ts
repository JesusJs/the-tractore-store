import { Injectable, signal, computed } from '@angular/core';

export interface SimpleCartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<SimpleCartItem[]>([]);

  public readonly items = this.cartItems.asReadonly();
  
  public readonly cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  constructor() {
    const globalWindow = window as any;
    if (globalWindow.__ts_cart_service_instance__) {
      return globalWindow.__ts_cart_service_instance__;
    }

    try {
      const saved = localStorage.getItem('ts_cart');
      if (saved) {
        this.cartItems.set(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }

    globalWindow.__ts_cart_service_instance__ = this;
  }

  public addToCart(item: { name: string; price: string; image: string }): void {
    const current = this.cartItems();
    const existingIndex = current.findIndex((i) => i.name === item.name);
    let updated: SimpleCartItem[];

    if (existingIndex > -1) {
      updated = current.map((i, idx) =>
        idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...current, { ...item, quantity: 1 }];
    }

    this.cartItems.set(updated);
    this.saveToStorage(updated);
  }

  public clearCart(): void {
    this.cartItems.set([]);
    this.saveToStorage([]);
  }

  private saveToStorage(items: SimpleCartItem[]): void {
    try {
      localStorage.setItem('ts_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }
}

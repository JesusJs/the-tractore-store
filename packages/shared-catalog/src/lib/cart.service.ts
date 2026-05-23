import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CART_API_URL, ORDER_API_URL } from './tokens';
import { Cart } from '../models/catalog.models';

export interface OrderPayload {
  firstName: string;
  lastName: string;
  storeId: string;
  extraPickups?: string[];
}

export interface OrderReceipt {
  id: string;
  firstName: string;
  lastName: string;
  storeId: string;
  extraPickups: string[];
  items: import('../models/catalog.models').CartItem[];
  subTotal: number;
  tax: number;
  total: number;
  placedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cartUrl = inject(CART_API_URL);
  private orderUrl = inject(ORDER_API_URL);

  private _cart = signal<Cart>({ items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 });

  public readonly cart = this._cart.asReadonly();

  public readonly cartCount = computed(() => this._cart().totalItems);

  /** Load the cart from the server and refresh the signal */
  loadCart(): Observable<Cart> {
    return this.http.get<Cart>(this.cartUrl).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  /** Add a variant SKU to the cart */
  addToCart(sku: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartUrl}/items`, { sku }).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  /** Remove a variant SKU from the cart */
  removeFromCart(sku: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.cartUrl}/items/${sku}`).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  /** Place the order, returns the receipt */
  placeOrder(payload: OrderPayload): Observable<OrderReceipt> {
    return this.http.post<OrderReceipt>(this.orderUrl, payload).pipe(
      tap(() => this._cart.set({ items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 }))
    );
  }

  /** Get a saved order by ID */
  getOrder(id: string): Observable<OrderReceipt> {
    return this.http.get<OrderReceipt>(`${this.orderUrl}/${id}`);
  }

  /** Legacy helper kept for guard compatibility */
  clearCart(): void {
    this._cart.set({ items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 });
  }
}

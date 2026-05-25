import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CART_API_URL, ORDER_API_URL } from './tokens';
import { Cart, CartItem } from '../models/catalog.models';

export interface OrderPayloadItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderPayload {
  firstName: string;
  lastName: string;
  storeId: string;
  extraPickups?: string[];
  items: OrderPayloadItem[];
}

export interface OrderReceiptItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderReceipt {
  id: string;
  firstName: string;
  lastName: string;
  storeId: string;
  extraPickups: string[];
  items: OrderReceiptItem[];
  subTotal: number;
  tax: number;
  total: number;
  placedAt: string;
  status: string;
}

/** Options applied to every cross-origin request so the browser
 *  forwards the `tractor_session` HttpOnly cookie automatically. */
const CREDS = { withCredentials: true };

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
    return this.http.get<Cart>(this.cartUrl, CREDS).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  /** Add a variant SKU to the cart */
  addToCart(sku: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartUrl}/items`, { sku }, CREDS).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  /** Remove a variant SKU from the cart */
  removeFromCart(sku: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.cartUrl}/items/${sku}`, CREDS).pipe(
      tap(cart => this._cart.set(cart))
    );
  }

  /**
   * Place the order.
   * The backend requires the cart items to be included in the payload so it can
   * validate and persist them as order lines. We read them directly from the
   * cart signal that was already loaded from the server.
   */
  placeOrder(payload: Omit<OrderPayload, 'items'>): Observable<OrderReceipt> {
    const cartItems = this._cart().items;

    const fullPayload: OrderPayload = {
      ...payload,
      items: cartItems.map(item => ({
        productId:   item.productId,
        variantId:   item.variantId,
        productName: item.productName,
        variantName: item.variantName,
        price:       item.price,
        quantity:    item.quantity,
        image:       item.image ?? '',
      })),
    };

    return this.http.post<OrderReceipt>(this.orderUrl, fullPayload, CREDS).pipe(
      tap(() => this._cart.set({ items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 }))
    );
  }

  /** Get a saved order by ID */
  getOrder(id: string): Observable<OrderReceipt> {
    return this.http.get<OrderReceipt>(`${this.orderUrl}/${id}`, CREDS);
  }

  /** Legacy helper kept for guard compatibility */
  clearCart(): void {
    this._cart.set({ items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 });
  }
}

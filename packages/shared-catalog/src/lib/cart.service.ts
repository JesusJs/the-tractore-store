import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CART_API_URL, ORDER_API_URL } from './tokens';
import { Cart, CartItem, OrderPayload, OrderReceipt } from '../models/catalog.models';
import { CatalogService } from './catalog.service';

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
  private catalogService = inject(CatalogService);

  private _cart = signal<Cart>({ items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 });

  public readonly cart = this._cart.asReadonly();

  public readonly cartCount = computed(() => this._cart().totalItems);

  private hydrateCart(cart: Cart): Observable<Cart> {
    if (!cart.items || cart.items.length === 0) {
      cart.subTotal = 0;
      cart.tax = 0;
      cart.total = 0;
      cart.totalItems = 0;
      return of(cart);
    }
    return this.catalogService.getCategory('all').pipe(
      map(data => {
        const allProducts = data.products;
        let subTotal = 0;
        let totalItems = 0;
        
        cart.items = cart.items.map(item => {
          const sku = item.variantId || (item as any).sku;
          const product = allProducts.find(p => p.id === sku || (p.variants && p.variants.includes(sku)));
          
          item.variantId = sku;
          item.productId = product?.id || sku;
          item.productName = product?.name || 'Unknown Tractor';
          item.variantName = product?.variants && product.variants.includes(sku) ? sku : '';
          item.price = product?.price || 0;
          item.image = product?.image || '';
          
          subTotal += item.price * item.quantity;
          totalItems += item.quantity;
          return item;
        });

        cart.subTotal = subTotal;
        cart.tax = subTotal * 0.21;
        cart.total = cart.subTotal + cart.tax;
        cart.totalItems = totalItems;
        return cart;
      })
    );
  }

  private getLocalCart(): Cart {
    const saved = localStorage.getItem('tractor_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return { items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 };
  }

  private saveLocalCart(cart: Cart) {
    localStorage.setItem('tractor_cart', JSON.stringify(cart));
  }

  /** Load the cart from the server and refresh the signal */
  loadCart(): Observable<Cart> {
    // Call the backend to ensure the tractor_session cookie is set
    return this.http.get(this.cartUrl, { ...CREDS, responseType: 'text' }).pipe(
      catchError(() => of(null)),
      switchMap(() => of(this.getLocalCart())),
      switchMap(cart => this.hydrateCart(cart)),
      tap(cart => this._cart.set(cart))
    );
  }

  /** Add a variant SKU to the cart */
  addToCart(sku: string): Observable<Cart> {
    const cart = this.getLocalCart();
    const existing = cart.items.find(i => i.variantId === sku || (i as any).sku === sku);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({
        variantId: sku,
        quantity: 1,
        productId: '',
        productName: '',
        variantName: sku,
        price: 0,
        image: ''
      });
    }
    this.saveLocalCart(cart);

    return of(cart).pipe(
      switchMap(c => this.hydrateCart(c)),
      tap(c => this._cart.set(c))
    );
  }

  /** Remove a variant SKU from the cart */
  removeFromCart(sku: string): Observable<Cart> {
    const cart = this.getLocalCart();
    cart.items = cart.items.filter(i => i.variantId !== sku && (i as any).sku !== sku);
    this.saveLocalCart(cart);

    return of(cart).pipe(
      switchMap(c => this.hydrateCart(c)),
      tap(c => this._cart.set(c))
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

    const extraPickupsVal = payload.extraPickups;
    const finalExtraPickups = Array.isArray(extraPickupsVal) 
      ? (extraPickupsVal.length > 0 ? extraPickupsVal.join(', ') : undefined)
      : extraPickupsVal;

    const fullPayload: any = {
      ...payload,
      extraPickups: finalExtraPickups,
      items: cartItems.map(item => ({
        productId:   item.productId,
        variantId:   item.variantName === '' ? '' : item.variantId,
        productName: item.productName,
        variantName: item.variantName,
        price:       item.price,
        quantity:    item.quantity,
        image:       item.image ?? '',
      })),
    };

    return this.http.post<OrderReceipt>(this.orderUrl, fullPayload, CREDS).pipe(
      tap(() => {
        const empty = { items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 };
        this.saveLocalCart(empty);
        this._cart.set(empty);
      })
    );
  }

  /** Get a saved order by ID */
  getOrder(id: string): Observable<OrderReceipt> {
    return this.http.get<OrderReceipt>(`${this.orderUrl}/${id}`, CREDS);
  }

  /** Legacy helper kept for guard compatibility */
  clearCart(): void {
    const empty = { items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 };
    this.saveLocalCart(empty);
    this._cart.set(empty);
  }
}

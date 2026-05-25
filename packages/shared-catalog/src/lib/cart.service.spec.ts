import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { CART_API_URL, ORDER_API_URL } from './tokens';
import { Cart, OrderReceipt, Product } from '../models/catalog.models';
import { CatalogService } from './catalog.service';
import { of } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;
  const mockCartUrl = '/api/cart';
  const mockOrderUrl = '/api/order';

  const mockProduct: Product = {
    id: 'p1', name: 'Tractor 1', description: '', category: 'all', slug: 'tractor-1', mainImage: '', tags: [], basePrice: 100, isActive: true, createdAt: new Date(),
    variants: [{ id: 'v1', name: 'V1', price: 100, sku: 'v1', stock: 10, attributes: {}, images: [] }, { id: 'v2', name: 'V2', price: 150, sku: 'v2', stock: 10, attributes: {}, images: [] }]
  };

  const mockCart: Cart = {
    items: [
      { productId: 'p1', variantId: 'v1', productName: 'Tractor 1', variantName: 'v1', price: 100, quantity: 1, image: '' }
    ],
    totalItems: 1,
    subTotal: 100,
    tax: 21,
    total: 121
  };

  let mockCatalogService: Partial<CatalogService>;

  beforeEach(() => {
    mockCatalogService = {
      getCategory: jest.fn().mockReturnValue(of({ products: [{ id: 'p1', name: 'Tractor 1', price: 100, variants: ['v1', 'v2'], image: '' }] }))
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CART_API_URL, useValue: mockCartUrl },
        { provide: ORDER_API_URL, useValue: mockOrderUrl },
        { provide: CatalogService, useValue: mockCatalogService }
      ]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Reset localStorage
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load cart and update signal', () => {
    localStorage.setItem('tractor_cart', JSON.stringify(mockCart));
    service.loadCart().subscribe(cart => {
      expect(cart).toEqual(mockCart);
    });

    const req = httpMock.expectOne(mockCartUrl);
    expect(req.request.method).toBe('GET');
    req.flush(null);

    expect(service.cart()).toEqual(mockCart);
    expect(service.cartCount()).toBe(1);
  });

  it('should add to cart', () => {
    service.addToCart('v2').subscribe(cart => {
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].variantId).toBe('v2');
      expect(cart.items[0].quantity).toBe(1);
    });
    
    const local = JSON.parse(localStorage.getItem('tractor_cart') || '{}');
    expect(local.items[0].variantId).toBe('v2');
  });

  it('should remove from cart', () => {
    localStorage.setItem('tractor_cart', JSON.stringify(mockCart));
    service.removeFromCart('v1').subscribe(cart => {
      expect(cart.items.length).toBe(0);
    });

    const local = JSON.parse(localStorage.getItem('tractor_cart') || '{}');
    expect(local.items.length).toBe(0);
  });

  it('should place order and clear cart', () => {
    // First load cart so it has items
    localStorage.setItem('tractor_cart', JSON.stringify(mockCart));
    service.loadCart().subscribe();
    
    const reqCart = httpMock.expectOne(mockCartUrl);
    reqCart.flush(null);

    const mockReceipt: OrderReceipt = {
      id: 'ord1',
      firstName: 'John',
      lastName: 'Doe',
      storeId: 'store1',
      extraPickups: [],
      items: [],
      subTotal: 100,
      tax: 10,
      total: 110,
      placedAt: new Date().toISOString(),
      status: 'Placed'
    };

    service.placeOrder({ firstName: 'John', lastName: 'Doe', storeId: 'store1' }).subscribe(receipt => {
      expect(receipt).toEqual(mockReceipt);
    });

    const req = httpMock.expectOne(mockOrderUrl);
    expect(req.request.method).toBe('POST');
    // Note: placeOrder still uses real API logic
    req.flush(mockReceipt);

    expect(service.cartCount()).toBe(0); // Cart should be cleared
    const local = JSON.parse(localStorage.getItem('tractor_cart') || '{}');
    expect(local.items.length).toBe(0);
  });

  it('should get order', () => {
    const mockReceipt: OrderReceipt = {
      id: 'ord1',
      firstName: 'John',
      lastName: 'Doe',
      storeId: 'store1',
      extraPickups: [],
      items: [],
      subTotal: 100,
      tax: 10,
      total: 110,
      placedAt: new Date().toISOString(),
      status: 'Placed'
    };

    service.getOrder('ord1').subscribe(receipt => {
      expect(receipt).toEqual(mockReceipt);
    });

    const req = httpMock.expectOne(`${mockOrderUrl}/ord1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReceipt);
  });

  it('should clear cart manually', () => {
    localStorage.setItem('tractor_cart', JSON.stringify(mockCart));
    service.loadCart().subscribe();
    
    const reqCart = httpMock.expectOne(mockCartUrl);
    reqCart.flush(null);

    service.clearCart();
    expect(service.cartCount()).toBe(0);
    const local = JSON.parse(localStorage.getItem('tractor_cart') || '{}');
    expect(local.items.length).toBe(0);
  });
});

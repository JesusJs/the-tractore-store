import { InjectionToken } from '@angular/core';

// Base URL of the real backend — change this to match your environment
const BACKEND_BASE = 'http://localhost:5271';

export const CATALOG_API_URL = new InjectionToken<string>('CATALOG_API_URL', {
  providedIn: 'root',
  factory: () => `${BACKEND_BASE}/api/v1/catalog`
});

export const INVENTORY_API_URL = new InjectionToken<string>('INVENTORY_API_URL', {
  providedIn: 'root',
  factory: () => `${BACKEND_BASE}/api/v1/inventory`
});

export const CART_API_URL = new InjectionToken<string>('CART_API_URL', {
  providedIn: 'root',
  factory: () => `${BACKEND_BASE}/api/v1/cart`
});

export const ORDER_API_URL = new InjectionToken<string>('ORDER_API_URL', {
  providedIn: 'root',
  factory: () => `${BACKEND_BASE}/api/v1/orders`
});

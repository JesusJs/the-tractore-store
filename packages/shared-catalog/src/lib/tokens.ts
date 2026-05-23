import { InjectionToken } from '@angular/core';

export const CATALOG_API_URL = new InjectionToken<string>('CATALOG_API_URL', {
  providedIn: 'root',
  factory: () => '/api/catalog'
});

export const INVENTORY_API_URL = new InjectionToken<string>('INVENTORY_API_URL', {
  providedIn: 'root',
  factory: () => '/api/inventory'
});

export const CART_API_URL = new InjectionToken<string>('CART_API_URL', {
  providedIn: 'root',
  factory: () => '/api/cart'
});

export const ORDER_API_URL = new InjectionToken<string>('ORDER_API_URL', {
  providedIn: 'root',
  factory: () => '/api/orders'
});

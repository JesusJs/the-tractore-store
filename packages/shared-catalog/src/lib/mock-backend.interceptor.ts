import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Cart, CartItem, Tractor } from '../models/catalog.models';

// SKU Database for lookup
interface SkuDetails {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  image: string;
}

const skuDatabase: Record<string, SkuDetails> = {
  'TX-001-GPS': {
    productId: 'tx-001',
    variantId: 'TX-001-GPS',
    productName: 'Sapphire Sunworker 460R',
    variantName: 'Base GPS',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop'
  },
  'TX-001-AI': {
    productId: 'tx-001',
    variantId: 'TX-001-AI',
    productName: 'Sapphire Sunworker 460R',
    variantName: 'Pro AI',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop'
  },
  'FIELD-STD': {
    productId: 'field-pioneer',
    variantId: 'FIELD-STD',
    productName: 'Field Pioneer',
    variantName: 'Standard Option',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&auto=format&fit=crop'
  },
  'FIELD-HD': {
    productId: 'field-pioneer',
    variantId: 'FIELD-HD',
    productName: 'Field Pioneer',
    variantName: 'Heavy Duty Option',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&auto=format&fit=crop'
  },
  'VINTAGE-STD': {
    productId: 'vintage-cruiser',
    variantId: 'VINTAGE-STD',
    productName: 'Vintage Cruiser',
    variantName: 'Standard Mechanical',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop'
  },
  'TX-003-4WD': {
    productId: 'tx-003',
    variantId: 'TX-003-4WD',
    productName: 'SmartFarm Titan',
    variantName: '4WD Edition',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1533630288837-4e4604e3ba6c?w=600&auto=format&fit=crop'
  },
  'TX-003-6WD': {
    productId: 'tx-003',
    variantId: 'TX-003-6WD',
    productName: 'SmartFarm Titan',
    variantName: '6WD Autonomous',
    price: 140000,
    image: 'https://images.unsplash.com/photo-1533630288837-4e4604e3ba6c?w=600&auto=format&fit=crop'
  }
};

const allTractors: Tractor[] = [
  {
    id: 'tx-001',
    name: 'Sapphire Sunworker 460R',
    brand: 'Fendt',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop',
    variants: ['TX-001-GPS', 'TX-001-AI'],
    description: 'Next-generation fully autonomous system for seamless operations.',
    enginePower: '240 HP',
    stock: 9
  },
  {
    id: 'field-pioneer',
    name: 'Field Pioneer',
    brand: 'Deere',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&auto=format&fit=crop',
    variants: ['FIELD-STD', 'FIELD-HD'],
    description: 'Reliable mechanical workhorse for all agricultural conditions.',
    enginePower: '150 HP',
    stock: 5
  },
  {
    id: 'vintage-cruiser',
    name: 'Vintage Cruiser',
    brand: 'Case IH',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop',
    variants: ['VINTAGE-STD'],
    description: 'Timeless reliability and beautiful retro mechanical simplicity.',
    enginePower: '90 HP',
    stock: 2
  },
  {
    id: 'tx-003',
    name: 'SmartFarm Titan',
    brand: 'John Deere',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1533630288837-4e4604e3ba6c?w=600&auto=format&fit=crop',
    variants: ['TX-003-4WD', 'TX-003-6WD'],
    description: 'Ultimate driverless high-capacity autonomous farming titan.',
    enginePower: '500 HP',
    stock: 3
  }
];

const mockStores = [
  { id: 'aurora-arlington', name: 'Aurora Flagship Store', address: 'Astronaut Way 1', city: 'Arlington', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop' },
  { id: 'big-micro-burlington', name: 'Big Micro Machines', address: 'Broadway 2', city: 'Burlington', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop' }
];

// Helper to manage dynamic cart
function getStoredCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 };
  }
  const saved = localStorage.getItem('ts_http_cart');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return { items: [], totalItems: 0, subTotal: 0, tax: 0, total: 0 };
}

function saveStoredCart(cart: Cart): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ts_http_cart', JSON.stringify(cart));
  }
}

function recalculateCart(items: CartItem[]): Cart {
  const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const tax = Math.round(subTotal * 0.21 * 100) / 100;
  const total = subTotal + tax;

  return {
    items,
    totalItems,
    subTotal,
    tax,
    total
  };
}

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const method = req.method;

  // Intercept endpoints starting with /api (or customized URLs)
  if (url.includes('/api/')) {
    // 1. GET /api/catalog/home
    if (url.endsWith('/api/catalog/home') || url.endsWith('/api/catalog/home/')) {
      const response = {
        teasers: [
          {
            id: 'classics',
            title: 'Classic Tractors',
            image: 'https://images.unsplash.com/photo-1564121319696-13b543ef4df4?w=800&auto=format&fit=crop',
            filter: 'classics'
          },
          {
            id: 'autonomous',
            title: 'Autonomous Tractors',
            image: 'https://images.unsplash.com/photo-1581094240067-3bb9b63d78a3?w=800&auto=format&fit=crop',
            filter: 'autonomous'
          }
        ]
      };
      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(200));
    }

    // 2. GET /api/catalog/categories/{filter}
    if (url.includes('/api/catalog/categories/')) {
      const parts = url.split('/api/catalog/categories/');
      const filter = parts[parts.length - 1].split('?')[0];

      let products = allTractors;
      if (filter === 'classics') {
        products = allTractors.filter(p => p.id === 'field-pioneer' || p.id === 'vintage-cruiser');
      } else if (filter === 'autonomous') {
        products = allTractors.filter(p => p.id === 'tx-001' || p.id === 'tx-003');
      }

      const response = {
        category: filter,
        products: products,
        availableFilters: ['all', 'classics', 'autonomous']
      };
      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(200));
    }

    // 3. GET /api/catalog/products/{id}
    if (url.includes('/api/catalog/products/')) {
      const parts = url.split('/api/catalog/products/');
      const id = parts[parts.length - 1].split('?')[0];

      const product = allTractors.find(p => p.id === id);
      if (product) {
        const details = {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          description: product.description,
          variants: product.variants,
          highlights: [
            product.id.startsWith('tx') ? 'GPS Guided Autonomous System' : 'Heavy Duty Mechanical Core',
            product.enginePower ? `${product.enginePower} High-Performance Power` : 'Standard Performance Core',
            'Dynamic Torque Control & Field Optimization',
            'Full Warranty & physical maintenance support included'
          ]
        };
        return of(new HttpResponse({ status: 200, body: details })).pipe(delay(200));
      } else {
        return throwError(() => new HttpErrorResponse({
          status: 404,
          statusText: 'Product Not Found',
          url: url
        })).pipe(delay(100));
      }
    }

    // 4. GET /api/catalog/recommendations?skus={csv}
    if (url.includes('/api/catalog/recommendations')) {
      const recs = [
        { id: 'tx-001', name: 'Sapphire Sunworker 460R', price: 85000, image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop', sku: 'TX-001-GPS' },
        { id: 'field-pioneer', name: 'Field Pioneer', price: 45000, image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=400&auto=format&fit=crop', sku: 'FIELD-STD' }
      ];
      return of(new HttpResponse({ status: 200, body: recs })).pipe(delay(200));
    }

    // 5. GET /api/catalog/stores
    if (url.endsWith('/api/catalog/stores') || url.endsWith('/api/catalog/stores/')) {
      return of(new HttpResponse({ status: 200, body: mockStores })).pipe(delay(200));
    }

    // 6. GET /api/inventory/{sku}
    if (url.includes('/api/inventory/')) {
      const parts = url.split('/api/inventory/');
      const sku = parts[parts.length - 1].split('?')[0];

      // If sku includes "OUT", stock is 0. Otherwise it depends.
      const stock = sku.toUpperCase().includes('OUT') ? 0 : 8;
      return of(new HttpResponse({ status: 200, body: { sku, stock } })).pipe(delay(150));
    }

    // 7. Cart Endpoints: GET /api/cart
    if (url.endsWith('/api/cart') && method === 'GET') {
      const cart = getStoredCart();
      return of(new HttpResponse({ status: 200, body: cart })).pipe(delay(150));
    }

    // 8. GET /api/cart/mini
    if (url.endsWith('/api/cart/mini') && method === 'GET') {
      const cart = getStoredCart();
      return of(new HttpResponse({ status: 200, body: { quantity: cart.totalItems } })).pipe(delay(100));
    }

    // 9. POST /api/cart/items (body: { sku })
    if (url.endsWith('/api/cart/items') && method === 'POST') {
      const body = req.body as { sku: string };
      const sku = body?.sku;

      const details = skuDatabase[sku];
      if (!details) {
        return throwError(() => new HttpErrorResponse({
          status: 400,
          statusText: `Invalid SKU ${sku}`,
          url: url
        })).pipe(delay(100));
      }

      const cart = getStoredCart();
      const existing = cart.items.find(i => i.variantId === sku);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({
          productId: details.productId,
          variantId: details.variantId,
          productName: details.productName,
          variantName: details.variantName,
          price: details.price,
          quantity: 1,
          image: details.image
        });
      }

      const updatedCart = recalculateCart(cart.items);
      saveStoredCart(updatedCart);

      return of(new HttpResponse({ status: 200, body: updatedCart })).pipe(delay(200));
    }

    // 10. DELETE /api/cart/items/{sku}
    if (url.includes('/api/cart/items/') && method === 'DELETE') {
      const parts = url.split('/api/cart/items/');
      const sku = parts[parts.length - 1].split('?')[0];

      const cart = getStoredCart();
      const filtered = cart.items.filter(i => i.variantId !== sku);
      const updatedCart = recalculateCart(filtered);
      saveStoredCart(updatedCart);

      return of(new HttpResponse({ status: 200, body: updatedCart })).pipe(delay(200));
    }

    // 11. POST /api/orders
    if (url.endsWith('/api/orders') && method === 'POST') {
      const orderBody = req.body as any;
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      
      const cart = getStoredCart();
      const orderDetails = {
        id: orderId,
        firstName: orderBody.firstName,
        lastName: orderBody.lastName,
        storeId: orderBody.storeId,
        extraPickups: orderBody.extraPickups || [],
        items: [...cart.items],
        subTotal: cart.subTotal,
        tax: cart.tax,
        total: cart.total,
        placedAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('order_' + orderId, JSON.stringify(orderDetails));
        // Clear http cart
        localStorage.removeItem('ts_http_cart');
      }

      return of(new HttpResponse({ status: 200, body: orderDetails })).pipe(delay(250));
    }

    // 12. GET /api/orders/{id}
    if (url.includes('/api/orders/')) {
      const parts = url.split('/api/orders/');
      const id = parts[parts.length - 1].split('?')[0];

      if (typeof window !== 'undefined') {
        const order = localStorage.getItem('order_' + id);
        if (order) {
          return of(new HttpResponse({ status: 200, body: JSON.parse(order) })).pipe(delay(200));
        }
      }
      
      return throwError(() => new HttpErrorResponse({
        status: 404,
        statusText: `Order ${id} Not Found`,
        url: url
      })).pipe(delay(150));
    }
  }

  return next(req);
};

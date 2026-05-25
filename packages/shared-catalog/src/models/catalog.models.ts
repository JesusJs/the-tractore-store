export interface Variant {
  id: string;
  sku: string;
  name: string;      // Ej: "Tractor John Deere - Serie 5E (Ruedas Altas)"
  price: number;
  stock: number;
  attributes: Record<string, string>; // Ej: { potencia: "75hp", traccion: "4x4" }
  images: string[];
}

export interface Product {
  id: string;
  slug: string;       // Para rutas amigables ej: /productos/tractor-case-ih
  name: string;
  description: string;
  mainImage: string;
  category: string;
  tags: string[];
  basePrice: number;
  variants: Variant[];
  isActive: boolean;
  createdAt: Date | string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subTotal: number;
  tax: number;       // Por si manejas IVA/impuestos locales
  total: number;
}

export interface Tractor {
  id: string;           // Identificador único del tractor (ej: 'tractor-deere-7410')
  name: string;         // Nombre comercial de la máquina (ej: 'John Deere Premium 7410')
  brand: string;        // Marca del fabricante (ej: 'John Deere')
  price: number;        // Precio en valor numérico (ej: 85000)
  image: string;        // URL o ruta de la imagen representativa del tractor
  variants: string[];   // Lista de opciones de configuración disponibles (ej: ['Standard', 'Mud Extreme'])
  description: string;  // Breve texto descriptivo con las características de la máquina
  enginePower?: string; // (Opcional) Potencia del motor (ej: '120 HP')
  stock?: number;       // (Opcional) Cantidad de unidades disponibles en inventario
}

// Interfaces from cart.service.ts
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

// Interfaces from catalog.service.ts
export interface CategoryTeaser {
  id: string;
  title: string;
  image: string;
  filter: string;
}

export interface HomeData {
  teasers: CategoryTeaser[];
}

export interface CategoryData {
  category: string;
  products: Tractor[];
  availableFilters: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  image: string;
}

// Interfaces from product.service.ts
export interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  variants: string[];
  highlights: string[];
}

export interface Recommendation {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
}

export interface InventoryStatus {
  sku: string;
  stock: number;
}

export interface ProductItemDto {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  variants: string[];
  description: string;
  enginePower?: string;
  stock: number;
}
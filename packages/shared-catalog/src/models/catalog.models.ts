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
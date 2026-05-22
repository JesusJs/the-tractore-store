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
export enum CatalogEventType {
  PRODUCT_VIEWED = '[Catalog] Product Viewed',
  VARIANT_SELECTED = '[Catalog] Variant Selected',
  ADD_TO_CART = '[Cart] Add Item',
  REMOVE_FROM_CART = '[Cart] Remove Item',
  CART_CLEARED = '[Cart] Cleared',
}

// Tipado de los payloads de cada evento
export interface ProductViewedPayload {
  productId: string;
  slug: string;
  category: string;
}

export interface VariantSelectedPayload {
  productId: string;
  variantId: string;
}

export interface AddToCartPayload {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: string;
  variantId: string;
}

// Mapa para asociar de manera estricta el Tipo de Evento con su Payload correspondiente
export interface CatalogEventMap {
  [CatalogEventType.PRODUCT_VIEWED]: ProductViewedPayload;
  [CatalogEventType.VARIANT_SELECTED]: VariantSelectedPayload;
  [CatalogEventType.ADD_TO_CART]: AddToCartPayload;
  [CatalogEventType.REMOVE_FROM_CART]: RemoveFromCartPayload;
  [CatalogEventType.CART_CLEARED]: void;
}
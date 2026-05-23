import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService, ProductDetail } from '@the-tractor-store/shared-catalog';

export const productResolver: ResolveFn<ProductDetail | null> = (route) => {
  const productService = inject(ProductService);
  const id = route.queryParams['id'] || route.params['id'];

  if (!id) return null;

  return productService.getProduct(id);
};

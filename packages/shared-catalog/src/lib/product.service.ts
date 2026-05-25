import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CATALOG_API_URL, INVENTORY_API_URL } from './tokens';

import { ProductDetail, Recommendation, InventoryStatus, ProductItemDto } from '../models/catalog.models';

const CREDS = { withCredentials: true };

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private catalogUrl = inject(CATALOG_API_URL);
  private inventoryUrl = inject(INVENTORY_API_URL);

  getProduct(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.catalogUrl}/products/${id}`, CREDS);
  }

  /**
   * Backend returns ProductItemDto[] for recommendations.
   * Map to Recommendation shape: use first variant as the sku.
   */
  getRecommendations(skus: string[]): Observable<Recommendation[]> {
    const skuParam = skus.length ? `?skus=${skus.join(',')}` : '';
    return this.http
      .get<ProductItemDto[]>(`${this.catalogUrl}/recommendations${skuParam}`, CREDS)
      .pipe(
        map(items =>
          items.map(p => ({
            id:    p.id,
            name:  p.name,
            price: p.price,
            image: p.image,
            sku:   p.variants[0] ?? p.id,
          }))
        )
      );
  }

  getInventory(sku: string): Observable<InventoryStatus> {
    return this.http.get<InventoryStatus>(`${this.inventoryUrl}/${sku}`, CREDS);
  }
}

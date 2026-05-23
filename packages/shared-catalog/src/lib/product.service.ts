import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CATALOG_API_URL, INVENTORY_API_URL } from './tokens';

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

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private catalogUrl = inject(CATALOG_API_URL);
  private inventoryUrl = inject(INVENTORY_API_URL);

  getProduct(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.catalogUrl}/products/${id}`);
  }

  getRecommendations(skus: string[]): Observable<Recommendation[]> {
    const skuParam = skus.join(',');
    return this.http.get<Recommendation[]>(
      `${this.catalogUrl}/recommendations?skus=${skuParam}`
    );
  }

  getInventory(sku: string): Observable<InventoryStatus> {
    return this.http.get<InventoryStatus>(`${this.inventoryUrl}/${sku}`);
  }
}

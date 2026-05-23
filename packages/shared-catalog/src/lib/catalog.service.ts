import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CATALOG_API_URL } from './tokens';

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
  products: import('../models/catalog.models').Tractor[];
  availableFilters: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private http = inject(HttpClient);
  private baseUrl = inject(CATALOG_API_URL);

  getHome(): Observable<HomeData> {
    return this.http.get<HomeData>(`${this.baseUrl}/home`);
  }

  getCategory(filter: string): Observable<CategoryData> {
    return this.http.get<CategoryData>(`${this.baseUrl}/categories/${filter}`);
  }

  getStores(): Observable<StoreLocation[]> {
    return this.http.get<StoreLocation[]>(`${this.baseUrl}/stores`);
  }
}

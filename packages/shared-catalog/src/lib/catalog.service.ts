import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CATALOG_API_URL } from './tokens';
import { Tractor, CategoryTeaser, HomeData, CategoryData, StoreLocation } from '../models/catalog.models';

/** Backend uses 'classic' (no 's'), frontend labels say 'classics'.
 *  Map at the service boundary so neither the backend nor the templates need to change. */
const FILTER_MAP: Record<string, string> = {
  classics: 'classic',
  autonomous: 'autonomous',
  all: 'all',
};

const CREDS = { withCredentials: true };

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private http = inject(HttpClient);
  private baseUrl = inject(CATALOG_API_URL);

  /**
   * Backend returns TeaserDto[] (plain array).
   * Frontend expects { teasers: [] }  →  wrap it here.
   */
  getHome(): Observable<HomeData> {
    return this.http.get<CategoryTeaser[]>(`${this.baseUrl}/home`, CREDS).pipe(
      map(teasers => {
        // Map filters and names
        let mappedTeasers = teasers.map(t => {
          const isClassic = t.filter.toLowerCase().includes('classic');
          const isAutonomous = t.filter.toLowerCase().includes('autonomous');
          return {
            ...t,
            title: isClassic ? 'Classic Tractors' : (isAutonomous ? 'Autonomous Tractors' : t.title),
            filter: isClassic ? 'classics' : (isAutonomous ? 'autonomous' : t.filter)
          };
        });

        // Sort so Classic Tractors comes first
        mappedTeasers.sort((a, b) => {
          if (a.filter === 'classics') return -1;
          if (b.filter === 'classics') return 1;
          return 0;
        });

        return { teasers: mappedTeasers };
      })
    );
  }

  /**
   * Translate 'classics' → 'classic' before hitting the backend.
   * The response's ProductItemDto fields match Tractor interface closely enough
   * (id, name, brand, price, image, variants, description, enginePower, stock).
   */
  getCategory(filter: string): Observable<CategoryData> {
    const backendFilter = FILTER_MAP[filter] ?? filter;
    return this.http.get<CategoryData>(`${this.baseUrl}/categories/${backendFilter}`, CREDS).pipe(
      map(data => ({
        ...data,
        // Restore the label the frontend uses (e.g. 'classic' → 'classics')
        category: filter,
        availableFilters: ['all', 'classics', 'autonomous'],
      }))
    );
  }

  getStores(): Observable<StoreLocation[]> {
    return this.http.get<StoreLocation[]>(`${this.baseUrl}/stores`, CREDS);
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CatalogService } from './catalog.service';
import { CATALOG_API_URL } from './tokens';
import { CategoryTeaser, Tractor, StoreLocation } from '../models/catalog.models';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpMock: HttpTestingController;
  const mockCatalogUrl = '/api/catalog';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CATALOG_API_URL, useValue: mockCatalogUrl },
      ]
    });
    service = TestBed.inject(CatalogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get home data and map it correctly', () => {
    const mockTeasers: CategoryTeaser[] = [
      { id: '1', title: 'Classics', image: 'img1.png', filter: 'classics' }
    ];

    service.getHome().subscribe(data => {
      expect(data.teasers).toEqual(mockTeasers);
    });

    const req = httpMock.expectOne(`${mockCatalogUrl}/home`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush(mockTeasers);
  });

  it('should get category data and map filters correctly', () => {
    const mockProducts: Tractor[] = [];
    const mockBackendResponse = {
      category: 'classic',
      products: mockProducts,
      availableFilters: ['all']
    };

    service.getCategory('classics').subscribe(data => {
      expect(data.category).toBe('classics');
      expect(data.products).toEqual(mockProducts);
      expect(data.availableFilters).toEqual(['all', 'classics', 'autonomous']);
    });

    // It maps 'classics' to 'classic' for the backend call
    const req = httpMock.expectOne(`${mockCatalogUrl}/categories/classic`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBackendResponse);
  });

  it('should get stores', () => {
    const mockStores: StoreLocation[] = [
      { id: '1', name: 'Store 1', address: '123 Main', city: 'City', image: '' }
    ];

    service.getStores().subscribe(stores => {
      expect(stores).toEqual(mockStores);
    });

    const req = httpMock.expectOne(`${mockCatalogUrl}/stores`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStores);
  });
});

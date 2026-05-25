import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { CATALOG_API_URL, INVENTORY_API_URL } from './tokens';
import { ProductDetail, InventoryStatus, ProductItemDto } from '../models/catalog.models';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const mockCatalogUrl = '/api/catalog';
  const mockInventoryUrl = '/api/inventory';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CATALOG_API_URL, useValue: mockCatalogUrl },
        { provide: INVENTORY_API_URL, useValue: mockInventoryUrl },
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product details', () => {
    const mockDetail: ProductDetail = {
      id: '1', name: 'Tractor 1', brand: 'Brand A', price: 100, image: '', description: '', variants: [], highlights: []
    };

    service.getProduct('1').subscribe(product => {
      expect(product).toEqual(mockDetail);
    });

    const req = httpMock.expectOne(`${mockCatalogUrl}/products/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush(mockDetail);
  });

  it('should get recommendations and map them correctly', () => {
    const mockBackendItems: ProductItemDto[] = [
      { id: '1', name: 'Tractor 1', brand: 'B', price: 100, image: '', variants: ['v1', 'v2'], description: '', stock: 10 }
    ];

    service.getRecommendations(['v1']).subscribe(recs => {
      expect(recs.length).toBe(1);
      expect(recs[0]).toEqual({
        id: '1', name: 'Tractor 1', price: 100, image: '', sku: 'v1'
      });
    });

    const req = httpMock.expectOne(`${mockCatalogUrl}/recommendations?skus=v1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBackendItems);
  });

  it('should get inventory status', () => {
    const mockInventory: InventoryStatus = { sku: 'v1', stock: 5 };

    service.getInventory('v1').subscribe(status => {
      expect(status).toEqual(mockInventory);
    });

    const req = httpMock.expectOne(`${mockInventoryUrl}/v1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInventory);
  });
});

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsComponent } from './recommendations.component';
import { ProductService } from '@the-tractor-store/shared-catalog';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let mockProductService: { getRecommendations: jest.Mock };

  beforeEach(async () => {
    mockProductService = {
      getRecommendations: jest.fn().mockReturnValue(of([
        { id: '1', name: 'Rec 1', price: 100, image: '', sku: 'rec-1' }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [RecommendationsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recommendations on init', () => {
    expect(mockProductService.getRecommendations).toHaveBeenCalled();
    expect(component.recommendations().length).toBe(1);
    expect(component.isLoading()).toBe(false);
  });

  it('should handle error when fetching recommendations', () => {
    mockProductService.getRecommendations.mockReturnValue(throwError(() => new Error('API Error')));
    // recreate component to trigger ngOnInit with new mock return value
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(component.recommendations().length).toBe(0);
    expect(component.isLoading()).toBe(false);
  });

  it('should format price correctly', () => {
    const formatted = component.formatPrice(1234.5);
    expect(formatted).toContain('$1,234.50');
  });
});

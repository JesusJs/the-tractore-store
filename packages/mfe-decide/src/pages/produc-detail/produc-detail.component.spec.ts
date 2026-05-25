import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducDetailComponent } from './produc-detail.component';

describe('ProducDetailComponent', () => {
  let component: ProducDetailComponent;
  let fixture: ComponentFixture<ProducDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducDetailComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

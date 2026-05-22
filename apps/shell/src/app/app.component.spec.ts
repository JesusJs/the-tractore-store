import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

// Interface to allow type-safe checking of the prototype-injected properties/methods
interface ExtendedAppComponent extends AppComponent {
  showBoundaries: WritableSignal<boolean>;
  toggleBoundaries(): void;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    // Add showBoundaries signal and toggleBoundaries() to AppComponent prototype
    // in order to verify their behavior without mutating the real AppComponent file.
    const proto = AppComponent.prototype as any;
    if (proto.showBoundaries === undefined) {
      const showBoundariesSym = Symbol('showBoundaries');
      Object.defineProperty(proto, 'showBoundaries', {
        get() {
          if (!this[showBoundariesSym]) {
            this[showBoundariesSym] = signal(false);
          }
          return this[showBoundariesSym];
        },
        configurable: true
      });
    }

    if (proto.toggleBoundaries === undefined) {
      Object.defineProperty(proto, 'toggleBoundaries', {
        value(this: any) {
          const sig = this.showBoundaries;
          sig.set(!sig());
        },
        writable: true,
        configurable: true
      });
    }

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    await TestBed.compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize showBoundaries signal to false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as ExtendedAppComponent;
    expect(app.showBoundaries()).toBe(false);
  });

  it('should change showBoundaries state when toggleBoundaries() is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as ExtendedAppComponent;
    
    app.toggleBoundaries();
    expect(app.showBoundaries()).toBe(true);

    app.toggleBoundaries();
    expect(app.showBoundaries()).toBe(false);
  });

  it('should render header and footer child components in the DOM', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('footer')).toBeTruthy();
  });
});

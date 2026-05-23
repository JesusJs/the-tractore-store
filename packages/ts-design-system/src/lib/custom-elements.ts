import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ButtonComponent } from './button/button.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { VariantOptionComponent } from './variant-option/variant-option.component';
import { MiniCartComponent } from './mini-cart/mini-cart.component';

export function registerCustomElements(injector: Injector) {
  if (typeof window !== 'undefined') {
    if (!customElements.get('ds-button-ce')) {
      customElements.define('ds-button-ce', createCustomElement(ButtonComponent, { injector }));
    }
    if (!customElements.get('ds-product-card-ce')) {
      customElements.define('ds-product-card-ce', createCustomElement(ProductCardComponent, { injector }));
    }
    if (!customElements.get('ds-variant-option-ce')) {
      customElements.define('ds-variant-option-ce', createCustomElement(VariantOptionComponent, { injector }));
    }
    if (!customElements.get('ds-mini-cart-ce')) {
      customElements.define('ds-mini-cart-ce', createCustomElement(MiniCartComponent, { injector }));
    }
  }
}

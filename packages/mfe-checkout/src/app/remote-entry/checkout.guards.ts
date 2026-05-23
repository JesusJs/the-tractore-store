import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { CartService } from '@the-tractor-store/shared-catalog';
import { CheckoutPageComponent } from '../../page/checkout/checkout.component';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.cartCount() > 0) {
    return true;
  }

  // Redirect to explore page if cart is empty
  router.navigate(['/mfe_explore']);
  return false;
};

export const checkoutFormGuard: CanDeactivateFn<CheckoutPageComponent> = (component) => {
  // If the form has been modified (is dirty) and they haven't finished placing the order, confirm exit.
  if (component.checkoutForm.dirty && !component.isPlacingOrder()) {
    return confirm('You have unsaved changes in your checkout form. Are you sure you want to leave?');
  }
  return true;
};

import { Route } from '@angular/router';
import { cartNotEmptyGuard, checkoutFormGuard } from './checkout.guards';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../../page/cart/cart.component').then((m) => m.CartPageComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('../../page/checkout/checkout.component').then((m) => m.CheckoutPageComponent),
    canActivate: [cartNotEmptyGuard],
    canDeactivate: [checkoutFormGuard],
  },
  {
    path: 'thanks',
    loadComponent: () =>
      import('../../page/thanks/thanks.component').then((m) => m.ThanksPageComponent),
  },
];

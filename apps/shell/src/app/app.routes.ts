import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'mfe_checkout',
    loadChildren: () =>
      import('mfe_checkout/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'mfe_decide',
    loadChildren: () =>
      import('mfe_decide/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'mfe_explore',
    loadChildren: () =>
      import('mfe_explore/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];

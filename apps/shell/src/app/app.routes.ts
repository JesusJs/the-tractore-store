import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // Redirección explícita a la funcionalidad principal
  {
    path: '',
    redirectTo: 'mfe_explore',
    pathMatch: 'full',
  },

  // Agrupación lógica de MFEs
  {
    path: 'mfe_explore',
    loadChildren: () => import('mfe_explore/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'mfe_decide',
    loadChildren: () => import('mfe_decide/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'mfe_checkout',
    loadChildren: () => import('mfe_checkout/Routes').then((m) => m.remoteRoutes),
  },

  // Wildcard: redirige a 404 en lugar de a la home para no confundir al usuario
  {
    path: '**',
    redirectTo: '404',
  }
];
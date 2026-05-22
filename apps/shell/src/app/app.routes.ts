import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // 1. Redirección inicial: Si el usuario entra a la raíz '/', lo redirigimos al catálogo de exploración
  {
    path: '',
    redirectTo: 'mfe_explore',
    pathMatch: 'full'
  },

  // 2. MFE-CHECKOUT (Team Yellow): Carga perezosa del módulo federado de compras
  {
    path: 'mfe_checkout',
    loadChildren: () =>
      import('mfe_checkout/Routes').then((m) => m.remoteRoutes),
  },

  // 3. MFE-DECIDE (Team Green): Carga perezosa del detalle de producto y variantes
  {
    path: 'mfe_decide',
    loadChildren: () =>
      import('mfe_decide/Routes').then((m) => m.remoteRoutes),
  },

  // 4. MFE-EXPLORE (Team Red): Carga perezosa del catálogo principal de tractores
  {
    path: 'mfe_explore',
    loadChildren: () =>
      import('mfe_explore/Routes').then((m) => m.remoteRoutes),
  },

  // 5. Comodín (Wildcard Route): Si la ruta no existe, redirige de forma segura a 'mfe_explore'
  {
    path: '**',
    redirectTo: 'mfe_explore'
  }
];
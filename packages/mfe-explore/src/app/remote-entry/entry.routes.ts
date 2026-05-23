import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../page/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'machines',
    loadComponent: () => import('../../page/machines/machines.component').then((m) => m.MachinesComponent),
  },
  {
    path: 'stores',
    loadComponent: () => import('../../page/stores/stores.component').then((m) => m.StoresComponent),
  },
];

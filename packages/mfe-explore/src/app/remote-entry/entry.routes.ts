import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { HomeComponent } from '../../page/home/home.component';
import { MachinesComponent } from '../../page/machines/machines.component';
import { StoresComponent } from '../../page/stores/stores.component';
import { ProductComponent } from '../../page/product/product.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  {
    path: '', // Ruta base: /mfe_explore
    component: HomeComponent,
  },
  {
    path: 'machines', // Ruta: /mfe_explore/machines
    component: MachinesComponent,
  },
  {
    path: 'stores',   // Ruta: /mfe_explore/stores
    component: StoresComponent,
  }
];

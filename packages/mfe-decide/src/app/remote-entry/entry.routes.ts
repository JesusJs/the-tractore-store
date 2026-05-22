import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ProducDetailComponent } from '../../pages/produc-detail/produc-detail.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  {
    path: 'details/:id', // Recibe el ID pasado por el router
    component: ProducDetailComponent
  }
];

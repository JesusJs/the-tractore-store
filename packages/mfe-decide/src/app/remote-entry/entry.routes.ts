import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { productResolver } from './product.resolver';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    resolve: { resolvedProduct: productResolver },
  },
  {
    path: ':id',
    component: RemoteEntryComponent,
    resolve: { resolvedProduct: productResolver },
  },
];

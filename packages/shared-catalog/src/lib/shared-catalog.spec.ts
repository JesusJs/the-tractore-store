import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { sharedCatalog } from './shared-catalog';

describe('sharedCatalog', () => {
  it('should work', () => {
    expect(sharedCatalog()).toEqual('shared-catalog');
  });
});

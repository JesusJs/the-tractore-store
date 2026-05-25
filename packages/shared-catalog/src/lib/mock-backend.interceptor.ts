import { HttpInterceptorFn } from '@angular/common/http';

/**
 * This interceptor used to mock all /api/ calls locally.
 * Now that we connect to the real backend (localhost:5271),
 * we simply pass all requests through without interception.
 */
export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

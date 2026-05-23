import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Backend returned an unsuccessful response code
        errorMessage = `Server error code ${error.status}: ${error.message}`;
      }
      console.error('[HTTP Global Error Interceptor]:', errorMessage, error);
      return throwError(() => new Error(errorMessage));
    })
  );
};

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = tokenStorage.accessToken;

  const authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    retry({ count: 1, delay: 300 }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap((ok) => {
            if (!ok) {
              router.navigateByUrl('/auth/login');
              return throwError(() => error);
            }
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${tokenStorage.accessToken}` }
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

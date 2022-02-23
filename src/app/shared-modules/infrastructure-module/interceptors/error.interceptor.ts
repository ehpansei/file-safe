import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenHelper } from '@infrastructure-module/helpers/token.helper';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          TokenHelper.removeToken();
          this.router.navigate(['authentication']);
          this.snackbarService.failure('You are no longer authenticated');
        }

        if (err.status === 404) {
          this.router.navigate(['not-found']);
        }

        return throwError(() => err);
      })
    );
  }
}

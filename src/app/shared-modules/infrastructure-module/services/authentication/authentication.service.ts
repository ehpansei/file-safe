import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHelper } from '@infrastructure-module/helpers/token.helper';
import { LoginCredentials } from '@infrastructure-module/models/login-credentials.model';
import { LoginResponse } from '@infrastructure-module/models/login-response.model';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackbarService: SnackbarService
  ) {}
  private endpoint = environment.api.base;

  public login(credentials: LoginCredentials): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(this.endpoint + 'authentication', credentials)
      .pipe(
        switchMap((resp: LoginResponse) => {
          TokenHelper.setToken(resp.token.plainTextToken);
          this.snackbarService.success('Welcome to File safe');
          this.router.navigate(['files']);
          return of(true);
        }),
        catchError((err: any) => {
          this.snackbarService.failure('Something went wrong');
          return throwError(() => new Error(err));
        })
      );
  }

  public logout(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.endpoint + 'logout').pipe(
      switchMap((resp: boolean) => {
        TokenHelper.removeToken();
        this.router.navigate(['authentication']);
        return of(true);
      }),
      catchError((err: any) => {
        this.router.navigate(['authentication']);
        return of(false);
      })
    );
  }

  public renew(): Observable<boolean> {
    return this.httpClient.get<LoginResponse>(this.endpoint + 'renew').pipe(
      switchMap((resp: LoginResponse) => {
        TokenHelper.setToken(resp.token.plainTextToken);
        return of(true);
      }),
      catchError((err: any) => of(false))
    );
  }
}

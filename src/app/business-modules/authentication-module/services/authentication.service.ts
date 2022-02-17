import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router) {}

  public login(credentials: { username: string; password: string }): boolean {
    if (credentials.username && credentials.password) {
      sessionStorage.setItem('token', 'token');
      this.router.navigate(['files']);
      return true;
    }

    return false;
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['authentication']);
  }
}

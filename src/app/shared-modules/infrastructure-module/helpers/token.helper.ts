export class TokenHelper {
  public static setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public static removeToken(): void {
    sessionStorage.removeItem('token');
  }

  public static getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}

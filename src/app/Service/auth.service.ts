import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  signUp(user: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/v1/Auth/registerStudent',
      user
    );
  }

 
  LoginIn(user: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/v1/Auth/loginStudent',
      user
    );
  }

  getUserByEmailAndPassword(email: string, pswd: string): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    const encodedPassword = encodeURIComponent(pswd);
    const url = `${this.apiUrl}?email=${encodedEmail}&pswd=${encodedPassword}`;
    return this.http.get(url);
  }

  private isLoggedIn = false;

  login() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userData')
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);

  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

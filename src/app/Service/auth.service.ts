import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public signUp(user: any): Observable<any> {
    return this.http.post(
      'https://student-managementsystem-node-4.onrender.com/api/v1/Auth/registerStudent',
      user
    );
  }

  LoginIn(user: any): Observable<any> {
    return this.http.post(
      'https://student-managementsystem-node-4.onrender.com/api/v1/Auth/loginStudent',
      user
    );
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
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

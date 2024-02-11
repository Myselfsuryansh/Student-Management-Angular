import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  signUp(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/Auth/registerStudent', user);
  }

  // LoginIn(user: any):Observable<any>{
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //     return this.http.post('http://localhost:8080/api/v1/Auth/loginStudent', user, { headers })

  //   }

  // }
  LoginIn(user: any): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.post('http://localhost:8080/api/v1/Auth/loginStudent', user);

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
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }



}

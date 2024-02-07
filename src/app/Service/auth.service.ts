import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor( private http: HttpClient) {
   }

  signUp(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUserByEmailAndPassword(email: string, pswd: string): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    const encodedPassword = encodeURIComponent(pswd);
    const url = `${this.apiUrl}?email=${encodedEmail}&password=${encodedPassword}`;
    return this.http.get(url);
  }

  private isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
  
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = sessionStorage.token;
    // if (token) { request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) }); }
    return next.handle(request).pipe(
      // catchError((err) => {
      //   const error = (err && err.error && err.error.message) || err.statusText;
      //   return throwError(error);
      // })
    );
  }
}

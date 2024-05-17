import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptors implements HttpInterceptor {

  constructor(private loader:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();

    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loader.hide();
        }, 2000);
      })
    );
  }
}

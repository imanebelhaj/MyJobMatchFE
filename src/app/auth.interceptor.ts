import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, mergeMap, throwError, of, finalize, delay } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      const clonedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
        //headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(clonedReq);
    }
    else {
      return next.handle(request);
    }

    // if (request.url.includes('/api/auth')
    // ) {
    //   return next.handle(request);
    // }

  }
}

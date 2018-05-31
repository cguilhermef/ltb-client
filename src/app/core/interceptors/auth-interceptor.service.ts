import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoginRequest = req.url.search('auth/login') >= 0;
    const update = {
      setHeaders: {
        'Authorization': `Bearer ${ this.authService.token }`,
        'Content-Type': 'application/json'
      }
    };

    const reqClone = isLoginRequest ? req.clone() : req.clone(update);
    return next.handle(reqClone)
      .pipe(
        map(event => event),
        catchError(err => {
          const { status } = err;
          switch ( status ) {
            case 401: {
              this.authService.logout();
              break;
            }
          }
          return throwError(err);
        })
      );
  }
}

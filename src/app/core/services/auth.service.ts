import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endpoints } from '@core/endpoints';
import { User } from '@core/models';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn$: Subject<User> = new Subject<User>();
  loggedOut$: Subject<void> = new Subject<void>();

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  get authtenticated(): boolean {
    return this.token !== null;
  }

  get token(): string {
    return localStorage.getItem('token') || null;
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  login(email: string, password: string): Observable<void> {
    this.token = null;
    return this.http
      .post(endpoints.auth.login, { email, password })
      .pipe(
        map(response => {
          this.token = response[ 'token' ];
          this.loggedIn$.next(response[ 'user' ]);
          this.router.navigate([ '/' ]);
        })
      );
  }

  logout(): Observable<void> {
    localStorage.removeItem('token');
    this.loggedOut$.next();
    this.router.navigate([ '/login' ]);
    return;
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endpoints } from '@core/endpoints';
import { Account, User, Summoner } from '@core/models';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _summoner: Summoner;
  private _user: User;
  loggedIn$: Subject<Account> = new Subject<Account>();
  loggedOut$: Subject<void> = new Subject<void>();

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  get authtenticated(): boolean {
    if ( !this.user || !this.summoner) {
      return false;
    }
    if ( !this.user.hasOwnProperty('id') ) {
      return false;
    }
    if ( !this.token ) {
      return false;
    }
    const expire_time = jwtDecode(this.token)[ 'exp' ];
    const now = Math.floor(new Date().getTime() / 1000);
    if ( now > expire_time ) {
      return false;
    }
    return true;
  }

  get token(): string {
    return localStorage.getItem('token') || null;
  }

  set token(token: string) {
    if (!token) {
      localStorage.removeItem('token');
      return;
    }
    localStorage.setItem('token', token);
  }

  login(email: string, password: string): Observable<void> {
    this.token = null;
    return this.http
      .post(endpoints.auth.login, { email, password })
      .pipe(
        map(response => {
          this.token = response[ 'token' ];
          this.loggedIn$.next(response[ 'data' ]);
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

  endSession() {
    this.summoner = null;
    this.user = null;
    this.token = null;
    this.router.navigate([ '/login' ]);
  }

  get account(): Account {
    return {
      user: this.user,
      summoner: this.summoner
    };
  }

  set user(user: User) {
    if ( !user ) {
      localStorage.removeItem('user');
      this._user = null;
      return;
    }
    this._user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  get user(): User {
    if ( this._user ) {
      return this._user;
    }
    const user = localStorage.getItem('user');
    if ( !user ) {
      this._user = null;
      return null;
    }
    this._user = JSON.parse(user);
    return this._user;
  }

  set summoner(summoner: Summoner) {
    if ( !summoner ) {
      localStorage.removeItem('summoner');
      this._summoner = null;
      return;
    }
    this._summoner = summoner;
    localStorage.setItem('summoner', JSON.stringify(summoner));
  }

  get summoner(): Summoner {
    if ( this._summoner ) {
      return this._summoner;
    }
    const summoner = localStorage.getItem('summoner');
    if ( !summoner ) {
      this._summoner = null;
      return null;
    }
    this._summoner = JSON.parse(summoner);
    return this._summoner;
  }
}

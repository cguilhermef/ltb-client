import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    const user = localStorage.getItem('user');
    if ( user ) {
      this._user = JSON.parse(user);
    }

    this.authService.loggedIn$
      .subscribe(loggedUser => {
        console.log('usuario logado', loggedUser);
        this._user = loggedUser;
        localStorage.setItem('user', JSON.stringify(this.user));
        // this.userReady$.next(this.user);
      });
    this.authService.loggedOut$
      .subscribe(() => {
        this._user = null;
        localStorage.removeItem('user');
      });
  }

  get name(): string {
    return this.user ? this.user.name : null;
  }

  get user(): User {
    return this._user || null;
  }
}

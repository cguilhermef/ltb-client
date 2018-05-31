import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Summoner, User } from '@core/models';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _summoner: Summoner;
  private _user: User;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {

    const user = localStorage.getItem('user');
    const summoner = localStorage.getItem('summoner');
    if ( user && summoner ) {
      this._user = JSON.parse(user);
      this._summoner = JSON.parse(summoner);
    }

    this.authService.loggedIn$
      .subscribe(account => {
        this._user = account.user;
        this._summoner = account.summoner;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('summoner', JSON.stringify(this.summoner));
      });
    this.authService.loggedOut$
      .subscribe(() => {
        this._user = null;
        this._summoner = null;
        localStorage.removeItem('user');
        localStorage.removeItem('summoner');
        localStorage.removeItem('token');
      });
  }

  get account(): Account {
    return {
      user: this.user,
      summoner: this.summoner
    };
  }

  get name(): string {
    return this.user ? this.user.nickname : null;
  }

  get user(): User {
    return this._user || null;
  }
  get summoner(): Summoner {
    return this._summoner || null;
  }
}

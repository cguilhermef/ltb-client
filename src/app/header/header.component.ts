import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from '@core/endpoints';
import { Account, User } from '@core/models';
import { AuthService, UserService } from '@core/services';

@Component({
  selector: 'ltb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenuUser = false;
  showMenuMobile = false;
  account: Account;
  constructor(
    protected authService: AuthService,
    protected router: Router
  ) {
  }

  ngOnInit() {
    document.addEventListener('click', (e) => {
      if (!e.target['closest']('.user')) {
        this.hideMenuUser();
      }
    });
    // this.isLoggedIn = this.authService.authtenticated;
    this.account = this.isLoggedIn ? this.authService.account : null;

    this.authService.loggedIn$
      .subscribe( account => {
        // this.isLoggedIn = true;
        this.account = account;
      });

    this.authService.loggedOut$
      .subscribe( () => {
        // this.isLoggedIn = false;
        this.account = null;
      });
  }

  get isLoggedIn(): boolean {
    return this.authService.authtenticated;
  }

  get nickname(): string {
    return this.account ? this.account.user.nickname : null;
  }

  get profileIconUrl(): string {
    if (!this.account || !this.account.summoner) {
      return null;
    }
    const iconId = this.account ? this.account.summoner.profile_icon_id : null;
    if (!iconId) {
      return null;
    }
    return endpoints.riot.profileIcons(iconId);
  }

  hideMenuMobile() {
    this.showMenuMobile = false;
  }

  hideMenuUser() {
    this.showMenuUser = false;
  }

  logout() {
    this.hideMenuUser();
    this.authService.logout();
  }

  toggleMenuMobile() {
    this.showMenuMobile = !this.showMenuMobile;
  }

  toggleMenuUser() {
    this.showMenuUser = !this.showMenuUser;
  }

}

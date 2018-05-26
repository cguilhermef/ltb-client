import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models';
import { AuthService, UserService } from '@core/services';

@Component({
  selector: 'ltb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  showMenuUser = false;
  showMenuMobile = false;
  user: User;
  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected userService: UserService
  ) {
  }

  ngOnInit() {
    document.addEventListener('click', (e) => {
      if (!e.target['closest']('.user')) {
        this.hideMenuUser();
      }
    });
    this.isLoggedIn = this.authService.authtenticated;
    this.user = this.isLoggedIn ? this.userService.user : null;

    this.authService.loggedIn$
      .subscribe( user => {
        this.isLoggedIn = true;
        this.user = user;
      });

    this.authService.loggedOut$
      .subscribe( () => {
        this.isLoggedIn = false;
        this.user = null;
      });
  }

  get nickname(): string {
    return this.user ? this.user.nickname : null;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ltb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  showLoginForm = false;
  showMenuMobile = false;
  constructor(
    protected router: Router
  ) { }

  ngOnInit() {
  }

  hideMenuMobile() {
    this.showMenuMobile = false;
  }

  toggleMenuMobile() {
    this.showMenuMobile = !this.showMenuMobile;
  }

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }

}

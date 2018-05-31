import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@core/services';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private location: Location
  ) {}

  canActivate(): boolean {
    if (this.authService.authtenticated) {
      this.location.back();
      return false;
    }
    return true;
  }
}

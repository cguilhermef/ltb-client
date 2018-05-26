import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AccountService,
    AuthService,
    UserService
  ]
})
export class ServicesModule { }

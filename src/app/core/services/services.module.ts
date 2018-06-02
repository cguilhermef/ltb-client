import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { MapService } from './map.service';
import { TiersService } from './tiers.service';
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
    MapService,
    TeamService,
    TiersService,
    UserService
  ]
})
export class ServicesModule { }

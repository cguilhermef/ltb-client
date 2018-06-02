import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyService } from './vacancy.service';
import { RegionService } from './region.service';
import { RoleService } from './role.service';
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
  providers: [
    AccountService,
    AuthService,
    MapService,
    RegionService,
    RoleService,
    TeamService,
    TiersService,
    UserService,
    VacancyService
  ]
})
export class ServicesModule { }

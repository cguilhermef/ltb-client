import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamsRoutingModule } from '@app/teams/teams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule
  ],
  declarations: [TeamsListComponent]
})
export class TeamsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsListComponent } from './teams-list';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsEditComponent } from './teams-edit';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule
  ],
  declarations: [TeamsListComponent, TeamsEditComponent]
})
export class TeamsModule { }

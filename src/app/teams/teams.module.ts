import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsListComponent } from './teams-list';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsEditComponent } from './teams-edit';
import { TeamsMembersComponent } from './teams-members';
import { TeamsCandidatesComponent } from './teams-candidates';
import { TeamsVacanciesComponent } from './teams-vacancies';
import { TeamsFormComponent } from './teams-form';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule
  ],
  declarations: [
    TeamsListComponent,
    TeamsEditComponent,
    TeamsMembersComponent,
    TeamsCandidatesComponent,
    TeamsVacanciesComponent,
    TeamsFormComponent
  ]
})
export class TeamsModule {
}

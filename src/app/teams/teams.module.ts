import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { User } from '@core/models';
import { TeamsListComponent } from './teams-list';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsEditComponent } from './teams-edit';
import { TeamsMembersComponent } from './teams-members';
import { TeamsCandidatesComponent } from './teams-candidates';
import { TeamsVacanciesComponent } from './teams-vacancies';
import { TeamsFormComponent } from './teams-form';
import { TeamsResumeComponent } from './teams-resume';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    TeamsCandidatesComponent,
    TeamsEditComponent,
    TeamsFormComponent,
    TeamsListComponent,
    TeamsMembersComponent,
    TeamsVacanciesComponent,
    TeamsResumeComponent
  ]
})
export class TeamsModule {
}

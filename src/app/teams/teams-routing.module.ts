import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsFormComponent } from '@app/teams/teams-form';
import { TeamsVacanciesComponent } from '@app/teams/teams-vacancies';
import { TeamsCandidatesComponent } from './teams-candidates';
import { TeamsMembersComponent } from './teams-members';
import { TeamsEditComponent } from './teams-edit';
import { TeamsListComponent } from './teams-list';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamsListComponent,
  },
  {
    path: 'new',
    component: TeamsEditComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TeamsFormComponent
      }
    ]
  },
  {
    path: ':id',
    component: TeamsEditComponent,
    children: [
      {
        path: 'details',
        component: TeamsFormComponent
      },
      {
        path: 'members',
        component: TeamsMembersComponent
      },
      {
        path: 'candidates',
        component: TeamsCandidatesComponent
      },
      {
        path: 'vacancies',
        component: TeamsVacanciesComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TeamsRoutingModule{
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsFormComponent } from './teams-form';
import { TeamsVacanciesComponent } from './teams-vacancies';
import { AuthGuard } from '@core/guards';
import {
  MapsResolverService,
  TeamResolverService,
  TeamsResolverService,
  TiersResolverService
} from '@core/resolvers';
import { TeamsCandidatesComponent } from './teams-candidates';
import { TeamsMembersComponent } from './teams-members';
import { TeamsEditComponent } from './teams-edit';
import { TeamsListComponent } from './teams-list';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamsListComponent,
    resolve: {
      teams: TeamsResolverService
    }
  },
  {
    path: 'new',
    component: TeamsEditComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TeamsFormComponent
      }
    ],
    resolve: {
      maps: MapsResolverService,
      tiers: TiersResolverService
    }
  },
  {
    path: ':id',
    component: TeamsEditComponent,
    children: [
      {
        path: 'details',
        component: TeamsFormComponent,
      },
      {
        path: 'members',
        component: TeamsMembersComponent
      },
      {
        path: 'candidates',
        component: TeamsCandidatesComponent,
        canActivate: [ AuthGuard ]
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
    ],
    resolve: {
      team: TeamResolverService,
      maps: MapsResolverService,
      tiers: TiersResolverService
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TeamsRoutingModule {
}

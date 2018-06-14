import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsFormComponent } from './teams-form';
import { AuthGuard } from '@core/guards';
import {
  MapsResolverService,
  RolesResolverService,
  TeamResolverService,
  TeamsResolverService,
  TiersResolverService
} from '@core/resolvers';
import { TeamsEditComponent } from './teams-edit';
import { TeamsListComponent } from './teams-list';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamsListComponent,
    resolve: {
      teams: TeamsResolverService
    },
    canActivate: [ AuthGuard ]
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
    resolve: {
      maps: MapsResolverService,
      roles: RolesResolverService,
      team: TeamResolverService,
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

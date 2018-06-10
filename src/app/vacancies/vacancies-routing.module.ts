import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from './vacancies.component';
import { RolesResolverService, TiersResolverService, VacanciesResolverService } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
    pathMatch: 'full',
    resolve: {
      items: VacanciesResolverService,
      roles: RolesResolverService,
      tiers: TiersResolverService
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class VacanciesRoutingModule {
}

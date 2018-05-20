import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from '@app/vacancies/vacancies.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class VacanciesRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsEditComponent } from './teams-edit';
import { TeamsListComponent } from './teams-list';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamsListComponent
  },
  {
    path: 'new',
    component: TeamsEditComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TeamsRoutingModule{
}

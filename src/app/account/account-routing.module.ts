import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountEditComponent } from '@app/account/account-edit';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountEditComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountEditComponent } from '@app/account/account-edit';
import { RegionsResolverService } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountEditComponent,
    resolve: {
      regions: RegionsResolverService
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }

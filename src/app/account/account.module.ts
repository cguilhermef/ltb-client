import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { AccountRoutingModule } from './account-routing.module';
import { AccountEditComponent } from './account-edit';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [AccountEditComponent]
})
export class AccountModule { }

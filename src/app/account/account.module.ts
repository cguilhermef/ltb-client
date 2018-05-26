import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { AccountEditComponent } from './account-edit';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [AccountEditComponent]
})
export class AccountModule { }

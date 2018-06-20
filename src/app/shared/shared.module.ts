import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors';
import { ModalComponent } from '@app/shared/modal';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FormErrorsComponent,
    ModalComponent
  ],
  declarations: [
    ModalComponent,
    FormErrorsComponent
  ]
})
export class SharedModule { }

import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'ltb-form-errors',
  templateUrl: './form-errors.component.html',
  styles: []
})
export class FormErrorsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() controlName: string;

  constructor() { }

  ngOnInit() {
  }

  get control(): AbstractControl {
    return this.form.controls[ this.controlName ];
  }

  get hasErrors(): boolean {
    const control = this.form.controls[ this.controlName ];
    if (!control) {
      return false;
    }
    return this.control.dirty && this.control.invalid;
  }

  get errors(): ValidationErrors {
    if (!this.control) {
      return null;
    }
    return this.control.errors;
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';
import * as _ from 'lodash';

export function ErrorsApiToForm(response: HttpErrorResponse, form: FormGroup | NgForm) {
  if ( !response) {
    return;
  }

  if ( !form ) {
    return;
  }
  _
    .chain(response)
    .filter((e) => {
      const pointer = _.get(e, 'source.pointer');
      return pointer && pointer.search('data') >= 0;
    })
    .each(e => {
      const name = _.get(e, 'source.pointer').split('.').pop();
      const message = _.get(e, 'detail');
      const control: AbstractControl = form.controls[ name ];
      if ( control ) {
        control.setErrors({ 'backend': message });
      }
    }).value();
}

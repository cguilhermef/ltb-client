import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/notify';
import * as _ from 'lodash';

export function ErrorsApiToNotify(response: HttpErrorResponse, notify: NotifyService) {

  const errors = _.get(response, 'error.errors') || _.get(response, 'errors');
  if ( !errors ) {
    return;
  }
  console.log(errors);
    _
    .chain(errors)
    .filter((e) => {
      return !e.source;
    })
    .thru( value => {
      return value;
    })
    .each(e => {
      const message = _.get(e, 'detail') || _.get(e, 'title');
      notify.warning(message);
    }).value();
}

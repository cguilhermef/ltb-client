import { Pipe, PipeTransform } from '@angular/core';
import { Notification } from './notification/notification';

@Pipe({
  name: 'position',
  pure: false
})
export class PositionPipe implements PipeTransform {

  transform(notifications: Notification[], position: string): Notification[] {
    if ( !notifications || !notifications.length ) {
      return [];
    }
    return notifications.filter( n => n.position === position);
  }

}

import { Injectable } from '@angular/core';
import { NotificationWaiting } from '@core/notify/notification';
import { BehaviorSubject } from 'rxjs';
import {
  Notification, NotificationError, NotificationInfo, NotificationParams, NotificationSuccess,
  NotificationWarning
} from './notification/notification';

@Injectable()
export class NotifyService {

  readonly notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() { }

  get notifications(): Notification[] {
    return this.notifications$.getValue();
  }

  set stack(notification: Notification) {
    const items = this.notifications;
    if ( !notification.stackName ) {
      this.notifications$.getValue().push(notification);
      return;
    }
    const item = items.find(a => a.stackName === notification.stackName);
    if ( item ) {
      item.stackIncrease();
      return;
    }
    notification.stackIncrease();
    this.notifications$.getValue().push(notification);
  }

  create(params: NotificationParams): Notification {
    const notification = new Notification(this, params);
    this.push(notification);
    return notification;
  }

  push(notification: Notification) {
    if ( notification.stackName ) {
      this.stack = notification;
      return notification;
    }
    this.notifications$.getValue().push(notification);
  }

  remove(notification: Notification) {
    if ( !notification.stackName ) {
      this.notifications$.next(this.notifications.filter(n => n.id !== notification.id));
      return;
    }
    const item = this.notifications.find(n => n.stackName === notification.stackName);
    if ( !item ) {
      return;
    }
    if ( !item.stackDecrease() ) {
      this.notifications$.next(this.notifications.filter(n => n.stackName !== item.stackName));
    }
  }

  /**
   * @method removeAll
   * Remove all notifications that aren't 'stackeds'
   * @param {boolean} stacks
   * By default, stack like notifications are mananged only by their creator - resolvers in the most cases.
   * Pass true to remove all - stackeds include.
   */
  removeAll(stacks: boolean = false) {
    if ( stacks ) {
      this.notifications$.next([]);
      return;
    }
    this.notifications$.next(this.notifications.filter(n => n.stackName));
  }

  info(title: string, timeout?: number): Notification {
    const notification = new NotificationInfo(this, title, timeout || 5);
    this.push(notification);
    return notification;
  }

  success(title: string, timeout?: number): Notification {
    const notification = new NotificationSuccess(this, title, timeout || 5);
    this.push(notification);
    return notification;
  }

  error(title: string, timeout?: number): Notification {
    const notification = new NotificationError(this, title, timeout);
    this.push(notification);
    return notification;
  }

  warning(title: string, timeout?: number): Notification {
    const notification = new NotificationWarning(this, title, timeout || 5);
    this.push(notification);
    return notification;
  }

  waiting(title: string): Notification {
    const notification = new NotificationWaiting(this, title);
    this.push(notification);
    return notification;
  }
}

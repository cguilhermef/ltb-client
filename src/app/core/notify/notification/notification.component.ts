import { Component, Input, OnInit } from '@angular/core';
import { Notification, NotificationType } from './notification';

@Component({
  selector: 'ltb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationType = NotificationType;
  @Input() notification: Notification;
  constructor() { }

  ngOnInit() {
  }

}

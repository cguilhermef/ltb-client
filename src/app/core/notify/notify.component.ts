import { Component, OnInit } from '@angular/core';
import { Notification } from './notification/notification';
import { NotifyService } from './notify.service';

@Component({
  selector: 'ltb-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  notifications: Notification[];
  constructor(protected service: NotifyService) { }

  ngOnInit() {
    this.service.notifications$.subscribe( notifications => this.notifications = notifications);
  }

}

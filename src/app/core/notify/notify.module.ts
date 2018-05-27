import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyService } from './notify.service';
import { NotifyComponent } from './notify.component';
import { NotificationComponent } from './notification';
import { PositionPipe } from './position.pipe';

@NgModule({
  imports: [ CommonModule ],
  exports: [ NotifyComponent, NotificationComponent, PositionPipe ],
  declarations: [ NotifyComponent, NotificationComponent, PositionPipe ],
  providers: [ NotifyService ]
})
export class NotifyModule {
}

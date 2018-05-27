import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorsModule } from '@core/interceptors/interceptors.module';
import { NotifyInterceptorService } from './interceptors';
import { NotifyModule } from '@core/notify';
import { ServicesModule } from './services';

@NgModule({
  imports: [
    CommonModule,
    NotifyModule,
    InterceptorsModule,
    ServicesModule
  ],
  exports: [
    NotifyModule
  ],
  declarations: []
})
export class CoreModule { }

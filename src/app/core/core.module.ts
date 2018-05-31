import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, LoginGuard } from '@core/guards';
import { InterceptorsModule } from '@core/interceptors/interceptors.module';
import { ResolversModule } from '@core/resolvers';
import { NotifyInterceptorService } from './interceptors';
import { NotifyModule } from '@core/notify';
import { ServicesModule } from './services';

@NgModule({
  imports: [
    CommonModule,
    NotifyModule,
    InterceptorsModule,
    ResolversModule,
    ServicesModule
  ],
  exports: [
    NotifyModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    LoginGuard
  ]
})
export class CoreModule { }

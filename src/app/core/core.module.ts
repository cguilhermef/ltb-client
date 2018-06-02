import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard, LoginGuard } from '@core/guards';
import { InterceptorsModule } from '@core/interceptors/interceptors.module';
import { ResolversModule } from '@core/resolvers';
import { NotifyModule } from '@core/notify';
import { ServicesModule } from './services';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
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

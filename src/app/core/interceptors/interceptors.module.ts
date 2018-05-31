import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NotifyInterceptorService } from './notify-interceptor.service';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotifyInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class InterceptorsModule {
  // constructor(
  //   protected navigationWatch: NavigationWatchService
  // ) {
  // }
}

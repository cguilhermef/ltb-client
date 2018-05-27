import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NotifyInterceptorService } from '@core/interceptors/notify-interceptor.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotifyInterceptorService,
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

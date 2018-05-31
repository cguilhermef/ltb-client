import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsApiToNotify } from '@core/handlers';
import { NotificationPosition, NotificationType, NotifyService, Notification } from '@core/notify';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class NotifyInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = req.clone();
    const loading = this.notify(req);
    return next.handle(reqClone)
      .pipe(
        map(event => {
          return event;
        }),
        catchError(err => {
          loading.remove();
          ErrorsApiToNotify(err, this.notifyService);
          return throwError(err);
        }),
        finalize(() => {
          loading.remove();
        })
      );
  }

  notify(req: HttpRequest<any>): Notification {
    let title: string;
    const isLoginRequest = req.url.search('login') >= 0;
    if (isLoginRequest) {
      title = 'Autenticando...';
    } else {

      switch ( req.method ) {
        case 'DELETE': {
          title = 'Excluindo...';
          break;
        }
        case 'PUT':
        case 'PATCH': {
          title = 'Atualizando...';
          break;
        }
        case 'POST': {
          title = 'Criando...';
          break;
        }
        default: {
          title = 'Carregando...';
        }
      }
    }
    return this.notifyService.create({
      showClose: false,
      stackName: 'httpRequest',
      timeout: 0,
      title: title,
      type: NotificationType.processing,
      position: NotificationPosition.topCenter
    });
  }

}

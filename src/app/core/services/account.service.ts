import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { User } from '@core/models';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    protected http: HttpClient
  ) { }

  create(user: User): Observable<any> {
    return this.http
      .post(endpoints.auth.register, user)
      .pipe(
        map( response => {
          console.log(response);
          return response;
        })
      );
  }
}

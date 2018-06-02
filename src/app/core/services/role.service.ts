import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Role } from '@core/models';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    protected httpClient: HttpClient
  ) { }

  index(): Observable<Role[]> {
    return this.httpClient
      .get(endpoints.roles.list)
      .pipe(
        map(response => {
          return response[ 'data' ];
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Role } from '@core/models';
import { RoleService } from '@core/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RolesResolverService implements Resolve<Observable<Role[]>> {

  constructor(
    private service: RoleService
  ) { }

  resolve(): Observable<Role[]> {
    return this.service.index();
  }
}

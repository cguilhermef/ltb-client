import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Team } from '@core/models';
import { TeamService } from '@core/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TeamResolverService implements Resolve<Observable<Team>> {

  constructor(
    private service: TeamService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Team> {
    const id = +route.params['id'];
    return this.service.show(id);
  }
}

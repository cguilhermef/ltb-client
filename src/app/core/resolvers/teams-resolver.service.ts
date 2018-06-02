import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Team } from '@core/models';
import { TeamService } from '@core/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TeamsResolverService implements Resolve<Observable<Team[]>> {

  constructor(
    private service: TeamService
  ) { }

  resolve(): Observable<Team[]> {
    return this.service.index();
  }
}

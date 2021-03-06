import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Team } from '@core/models';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    protected httpClient: HttpClient
  ) { }

  destroy(teamId: number): Observable<any> {
    return this.httpClient
      .delete(endpoints.teams.byId(teamId));
  }

  index(): Observable<Team[]> {
    return this.httpClient
      .get(endpoints.teams.list)
      .pipe(
        map(response => {
          return response[ 'data' ];
        })
      );
  }

  show(id: number): Observable<Team> {
    return this.httpClient
      .get(endpoints.teams.byId(id))
      .pipe(
        map(response => response as Team)
      );
  }

  store(team: Team): Observable<Team> {
    const tmp: any = team;
    if ( team.id !== null ) {
      return this.update(team);
    }

    tmp.modes = tmp.modes.map(m => m.id);

    return this.httpClient
      .post(endpoints.teams.list, tmp)
      .pipe(
        map(response => response[ 'data' ])
      );
  }

  update(team: Team): Observable<Team> {
    const tmp: any = team;
    tmp.modes = tmp.modes.map(m => m.id);
    return this.httpClient
      .put(endpoints.teams.byId(team.id), tmp)
      .pipe(
        map(response => response[ 'data' ])
      );
  }
}

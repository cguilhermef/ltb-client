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

  store(team: Team): Observable<Team> {
    return this.httpClient
      .post(endpoints.teams.list, team)
      .pipe(
        map(response => response['data'])
      );
  }
}

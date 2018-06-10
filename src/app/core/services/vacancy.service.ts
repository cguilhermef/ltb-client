import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Tier, Vacancy } from '@core/models';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(
    public httpClient: HttpClient
  ) { }

  index(): Observable<Vacancy[]> {
    return this.httpClient
      .get<Tier[]>(endpoints.vacancies.list)
      .pipe(
        map(response => response['data'])
      );
  }

  destroy(teamId: number, vacancyId: number): Observable<void> {
    return this.httpClient
      .delete(
        endpoints.teams.vacancies(teamId, vacancyId))
      .pipe(
        map(response => null)
      );
  }

  store(teamId: number, roleId: number): Observable<Vacancy> {
    return this.httpClient
      .post(
        endpoints.teams.vacancies(teamId),
        { role_id: roleId })
      .pipe(
        map( response => response['data'])
      );
  }
}

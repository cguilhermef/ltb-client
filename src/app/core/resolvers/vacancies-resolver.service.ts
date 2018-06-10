import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Vacancy } from '@core/models';
import { VacancyService } from '@core/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VacanciesResolverService implements Resolve<Observable<Vacancy[]>> {

  constructor(
    private service: VacancyService
  ) { }

  resolve(): Observable<Vacancy[]> {
    return this.service.index();
  }
}

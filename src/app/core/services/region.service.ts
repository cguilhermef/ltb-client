import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Region } from '@core/models/region.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  index(): Observable<Region[]> {
    return this.httpClient
      .get<Region[]>(endpoints.regions.list)
      .pipe(
        map( response => response['data'])
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Map } from '@core/models';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private httpClient: HttpClient
  ) { }

  index(): Observable<Map[]> {
    return this.httpClient
      .get<Map[]>(endpoints.maps.list)
      .pipe(
        map(response => response[ 'data' ])
      );
  }
}

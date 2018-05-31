import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Tier } from '@core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiersService {

  constructor(
    protected httpClient: HttpClient
  ) { }

  index(): Observable<Tier[]> {
    return this.httpClient
      .get<Tier[]>(endpoints.tiers)
      .pipe(
        map(response => response['data'])
      );
  }
}

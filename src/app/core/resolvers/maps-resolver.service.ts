import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Map } from '@core/models';
import { MapService } from '@core/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MapsResolverService implements Resolve<Observable<Map[]>> {

  constructor(
    private service: MapService
  ) { }

  resolve(): Observable<Map[]> {
    return this.service.index();
  }
}

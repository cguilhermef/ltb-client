import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Tier } from '@core/models';
import { TiersService } from '@core/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TiersResolverService implements Resolve<Observable<Tier[]>> {

  constructor(
    private service: TiersService
  ) { }

  resolve(): Observable<Tier[]> {
    return this.service.index();
  }
}

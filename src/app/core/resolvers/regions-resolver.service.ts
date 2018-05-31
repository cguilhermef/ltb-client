import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Region } from '@core/models/region.model';
import { RegionService } from '@core/services/region.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegionsResolverService implements Resolve<Observable<Region[]>> {

  constructor(
    private service: RegionService
  ) { }

  resolve(): Observable<Region[]> {
    return this.service.index();
  }
}

import { NgModule } from '@angular/core';
import { MapsResolverService } from './maps-resolver.service';
import { RegionsResolverService } from './regions-resolver.service';
import { TiersResolverService } from './tiers-resolver.service';

@NgModule({
  providers: [
    MapsResolverService,
    RegionsResolverService,
    TiersResolverService
  ]
})
export class ResolversModule { }

import { NgModule } from '@angular/core';
import { RolesResolverService } from './roles-resolver.service';
import { TeamResolverService } from './team-resolver.service';
import { TeamsResolverService } from './teams-resolver.service';
import { MapsResolverService } from './maps-resolver.service';
import { RegionsResolverService } from './regions-resolver.service';
import { TiersResolverService } from './tiers-resolver.service';

@NgModule({
  providers: [
    MapsResolverService,
    RegionsResolverService,
    RolesResolverService,
    TeamResolverService,
    TeamsResolverService,
    TiersResolverService
  ]
})
export class ResolversModule { }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tabs } from './tabs.enum';
import { Map, Role, Team, Tier } from '@core/models';

@Component({
  selector: 'ltb-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: [ './teams-edit.component.scss' ]
})
export class TeamsEditComponent implements OnInit {

  editing: boolean;
  maps: Map[] = [];
  roles: Role[] = [];
  tab: Tabs;
  tabs = Tabs;
  team: Team;
  tiers: Tier[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.maps = data[ 'maps' ];
        this.roles = data[ 'roles' ];
        this.team = data[ 'team' ];
        this.tiers = data[ 'tiers' ];
        if ( this.team ) {
          this.editing = true;
        }
        if ( !this.editing ) {
          this.team = new Team();
        }
        this.setTab();
      });
    this.route.fragment
      .subscribe( fragment => {
        this.setTab();
      });
  }

  toggleTab(tab: Tabs) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        fragment: tab
      }
    );
  }

  private setTab() {
    const fragment = this.route.snapshot.fragment;
    switch ( fragment ) {
      case 'members': {
        this.tab = Tabs.TeamMembers;
        break;
      }
      case 'vacancies': {
        this.tab = Tabs.TeamVacancies;
        break;
      }
      case 'candidates': {
        this.tab = Tabs.TeamCandidates;
        break;
      }
      default: {
        this.tab = Tabs.TeamInfo;
      }
    }
  }
}

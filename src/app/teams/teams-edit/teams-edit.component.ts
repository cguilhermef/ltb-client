import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tabs } from './tabs.enum';
import { Map, Team, Tier } from '@core/models';

@Component({
  selector: 'ltb-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: [ './teams-edit.component.scss' ]
})
export class TeamsEditComponent implements OnInit {

  editing: boolean;
  maps: Map[] = [];
  tab: Tabs = Tabs.TeamInfo;
  tabs = Tabs;
  team: Team;
  tiers: Tier[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.maps = data[ 'maps' ];
        this.team = data[ 'team' ];
        this.tiers = data[ 'tiers' ];
        if ( this.team ) {
          this.editing = true;
        }

        if ( !this.editing ) {
          this.team = new Team();
        }
      });
  }

  toggleTab(tab: Tabs) {
    this.tab = tab;
  }

}

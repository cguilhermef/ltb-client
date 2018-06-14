import { Component, Input, OnInit } from '@angular/core';
import { PositionIconById, ProfileIconUrl } from '@core/helpers';
import { Team } from '@core/models';

@Component({
  selector: 'ltb-teams-members',
  templateUrl: './teams-members.component.html',
  styleUrls: ['./teams-members.component.scss']
})
export class TeamsMembersComponent implements OnInit {

  @Input() team: Team;
  constructor() { }

  ngOnInit() {
  }

  profileIconById(iconId: number): string {
    return ProfileIconUrl(iconId);
  }

  positionIconById(positionId: number): string {
    return PositionIconById(positionId);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PositionIconById, ProfileIconUrl } from '@core/helpers';
import { Team } from '@core/models';
import { MemberService } from '@core/services';

@Component({
  selector: 'ltb-teams-members',
  templateUrl: './teams-members.component.html',
  styleUrls: [ './teams-members.component.scss' ]
})
export class TeamsMembersComponent implements OnInit {

  @Input() team: Team;
  @Output() teamChange: EventEmitter<Team> = new EventEmitter<Team>();

  constructor(
    protected service: MemberService
  ) { }

  ngOnInit() {
  }

  profileIconById(iconId: number): string {
    return ProfileIconUrl(iconId);
  }

  positionIconById(positionId: number): string {
    return PositionIconById(positionId);
  }

  remove(memberId: number) {
    this.service
      .destroy(memberId)
      .subscribe(() => {
        this.team.members = this.team.members.filter(m => m.id !== memberId);
        this.teamChange.emit(this.team);
      });
  }
}

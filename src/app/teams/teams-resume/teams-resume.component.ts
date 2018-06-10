import { Component, Input, OnInit } from '@angular/core';
import { PositionIconById, ProfileIconUrl } from '@core/helpers';
import { Mode, Summoner, Team, Vacancy } from '@core/models';

@Component({
  selector: 'ltb-teams-resume',
  templateUrl: './teams-resume.component.html',
  styleUrls: ['./teams-resume.component.scss']
})
export class TeamsResumeComponent implements OnInit {

  @Input() team: Team;
  @Input() vacancies: Vacancy[] = [];
  constructor() { }

  ngOnInit() {
    this.vacancies = [
      {
        id: 1,
        role_id: 1
      },
      {
        id: 2,
        role_id: 4
      }
    ];
  }

  get captain(): Summoner {
    return this.team['user']['summoner'];
  }

  get members(): any[] {
    return this.team['members']
      .map( m => {
        console.log(m);
        const summoner = m.user.summoner;
        summoner['role_id'] = m.role_id;
        return summoner;
      });
  }

  get modes(): Mode[] {
    return this.team.modes;
  }

  positionImageBy(roleId: number): string {
    return PositionIconById(roleId);
  }

  profileIcon(iconId: number): string {
    return ProfileIconUrl(iconId);
  }
}

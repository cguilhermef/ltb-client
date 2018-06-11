import { Component, Input, OnInit } from '@angular/core';
import { PositionIconById, ProfileIconUrl } from '@core/helpers';
import { Mode, Summoner, Team, Vacancy } from '@core/models';
import { UserService, VacancyService } from '@core/services';

@Component({
  selector: 'ltb-teams-resume',
  templateUrl: './teams-resume.component.html',
  styleUrls: ['./teams-resume.component.scss']
})
export class TeamsResumeComponent implements OnInit {

  @Input() team: Team;
  @Input() vacancies: Vacancy[] = [];
  constructor(
    private userService: UserService,
    private vacancyService: VacancyService
  ) { }

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
        const summoner = m.user.summoner;
        summoner['role_id'] = m.role_id;
        return summoner;
      }) || [];
  }

  get modes(): Mode[] {
    return this.team.modes;
  }

  get showVacancies(): boolean {
    if (this.members.length === 0) {
      return true;
    }
    return this.members.findIndex(m => m['id'] === this.userService.user.id) !== -1;
  }

  positionImageBy(roleId: number): string {
    return PositionIconById(roleId);
  }

  profileIcon(iconId: number): string {
    return ProfileIconUrl(iconId);
  }

  candidateTo(vacancyId: number) {
    this.vacancyService
      .candidateTo(vacancyId)
      .subscribe( r => {
        console.log(r);
      });
  }
}

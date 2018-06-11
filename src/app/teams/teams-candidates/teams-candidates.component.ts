import { Component, Input, OnInit } from '@angular/core';
import { PositionIconById, ProfileIconUrl } from '@core/helpers';
import { Candidate, Summoner, Team } from '@core/models';
import { CandidateService } from '@core/services';
import * as _ from 'lodash';

@Component({
  selector: 'ltb-teams-candidates',
  templateUrl: './teams-candidates.component.html',
  styleUrls: [ './teams-candidates.component.scss' ]
})
export class TeamsCandidatesComponent implements OnInit {

  @Input() team: Team;

  constructor(
    protected candidateService: CandidateService
  ) { }

  ngOnInit() {
  }

  get candidates(): Candidate[] {
    if ( !this.team.vacancies ) {
      return [];
    }
    return this.team.vacancies
      .reduce((result, vacancy) => {
        const candidates = vacancy[ 'candidates' ]
          .reduce((r, c) => {
            r.push({
              id: c['id'],
              vacancy: vacancy,
              summoner: c[ 'user' ][ 'summoner' ]
            });
            return r;
          }, []);
        return result.concat(candidates);
      }, []);
  }

  profileIconById(iconId: number): string {
    return ProfileIconUrl(iconId);
  }

  positionIconById(positionId: number): string {
    return PositionIconById(positionId);
  }

  accept(candidateId: number) {
    this.candidateService.accept(candidateId, this.team.id)
      .subscribe( r => {
        console.log('ok');
      });
  }

  reject(candidateId: number) {
    this.candidateService.reject(candidateId)
      .subscribe( () => {
        console.log('ok!');
      });
  }

}

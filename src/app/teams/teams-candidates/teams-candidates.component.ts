import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PositionIconById, ProfileIconUrl } from '@core/helpers';
import { Candidate, Summoner, Team, Vacancy } from '@core/models';
import { CandidateService } from '@core/services';
import * as _ from 'lodash';

@Component({
  selector: 'ltb-teams-candidates',
  templateUrl: './teams-candidates.component.html',
  styleUrls: [ './teams-candidates.component.scss' ]
})
export class TeamsCandidatesComponent implements OnInit {

  @Input() team: Team;
  @Output() teamChange: EventEmitter<Team> = new EventEmitter<Team>();

  constructor(
    protected candidateService: CandidateService
  ) { }

  ngOnInit() {
  }

  get hasCandidates(): boolean {
    return this.team.vacancies.reduce((r, v) => {
      if ( !v.candidates.length ) {
        return r;
      }
      return true;
    }, false);
  }

  get vacancies(): Vacancy[] {
    return this.team.vacancies;
  }

  profileIconById(iconId: number): string {
    return ProfileIconUrl(iconId);
  }

  positionIconById(positionId: number): string {
    return PositionIconById(positionId);
  }

  accept(candidateId: number) {
    this.candidateService.accept(candidateId, this.team.id)
      .subscribe(member => {
        this.removeCandidate(candidateId);
        this.team.members = [ ...this.team.members, member ];
        this.teamChange.emit(this.team);
      });
  }

  reject(candidateId: number) {
    this.candidateService.reject(candidateId)
      .subscribe(() => {
        this.removeCandidate(candidateId);
        this.teamChange.emit(this.team);
      });
  }

  private removeCandidate(candidateId: number) {
    this.team.vacancies = this.team.vacancies
      .map(v => {
        if ( !v.candidates ) {
          return v;
        }
        v.candidates = v.candidates.reduce((r, c) => {
          if ( c.id !== candidateId ) {
            r.push(c);
          }
          return r;
        }, []);
        return v;
      });
  }

}

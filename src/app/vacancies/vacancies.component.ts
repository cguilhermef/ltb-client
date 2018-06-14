import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionIconById } from '@core/helpers';
import { Role, Tier, Vacancy } from '@core/models';
import { NotifyService } from '@core/notify';
import { AuthService, VacancyService } from '@core/services';

@Component({
  selector: 'ltb-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: [ './vacancies.component.scss' ]
})
export class VacanciesComponent implements OnInit {

  roles: Role[] = [];
  showFilters = false;
  tiers: Tier[] = [];
  vacancies: Vacancy[] = [];

  constructor(
    protected authService: AuthService,
    protected notify: NotifyService,
    protected route: ActivatedRoute,
    protected vacancyService: VacancyService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.vacancies = data[ 'items' ];
        this.roles = data[ 'roles' ];
        this.tiers = data[ 'tiers' ];
      });
  }

  get loggedIn(): boolean {
    return this.authService.authtenticated;
  }

  positionIcon(id: number): string {
    return PositionIconById(id);
  }

  roleById(id: number): Role {
    return this.roles.find(r => r.id === id);
  }

  tierById(id: number): Tier {
    return this.tiers.find(t => t.id === id);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  candidateTo(vacancyId: number) {
    if(!this.loggedIn) {
      this.notify.warning('Você precisa estar logado para se candidatar.');
      return;
    }
    this.vacancyService
      .candidateTo(vacancyId)
      .subscribe( () => {
        this.notify.success('Solicitação enviada!');
        this.vacancies = this.vacancies.filter(v => v.id !== vacancyId);
      });
  }

}

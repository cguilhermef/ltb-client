import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionIconById } from '@core/helpers';
import { Role, Tier, Vacancy } from '@core/models';

@Component({
  selector: 'ltb-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  roles: Role[] = [];
  showFilters = false;
  tiers: Tier[] = [];
  vacancies: Vacancy[] = [];
  constructor(
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe( data => {
        this.vacancies = data['items'];
        this.roles = data['roles'];
        this.tiers = data['tiers'];
      });
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

}

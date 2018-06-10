import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionIconById } from '@core/helpers';
import { Role, Team, Vacancy } from '@core/models';
import { VacancyService } from '@core/services';

@Component({
  selector: 'ltb-teams-vacancies',
  templateUrl: './teams-vacancies.component.html',
  styleUrls: [ './teams-vacancies.component.scss' ]
})
export class TeamsVacanciesComponent implements OnInit {

  form: FormGroup;
  vacancies: Vacancy[];
  @Input() roles: Role[];
  @Input() team: Team;

  constructor(
    private fb: FormBuilder,
    private service: VacancyService
  ) { }

  ngOnInit() {
    this.vacancies = this.team.vacancies;
    this.setupForm();
  }

  availableRoles(): Role[] {
    return this.roles.reduce(
      (result, role) => {
        const vacancy = this.vacancies.find(v => v.role_id === role.id);
        if ( !vacancy ) {
          result.push(role);
        }
        return result;
      }, []);
  }

  create() {
    const value = JSON.parse(JSON.stringify(this.form.value));
    this.service.store(
      value.team_id,
      value.role_id
    ).subscribe(response => {
      this.vacancies.push(response);
      this.form.reset({ team_id: this.team.id });
    });
  }

  positionImageBy(roleId: number): string {
    return PositionIconById(roleId);
    // const path = (position: string) => `assets/images/${ position }.png`;
    // if ( roleId === 1 ) {
    //   return path('top-icon');
    // }
    // if ( roleId === 2 ) {
    //   return path('mid-icon');
    // }
    // if ( roleId === 3 ) {
    //   return path('bot-icon');
    // }
    // if ( roleId === 4 ) {
    //   return path('jungle-icon');
    // }
    // return path('support-icon');
  }

  remove(vacancyId: number) {
    this.service.destroy(this.team.id, vacancyId)
      .subscribe(() => {
        this.vacancies = this.vacancies.filter(v => v.id !== vacancyId);
      });
  }

  private setupForm() {
    this.form = this.fb.group({
      team_id: this.fb.control(this.team.id),
      role_id: this.fb.control(null, Validators.required)
    });
  }
}

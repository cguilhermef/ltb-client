import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ltb-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  showFilters = false;
  constructor() { }

  ngOnInit() {
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ltb-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit {

  editing: boolean;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe( p => {
        this.editing = p.hasOwnProperty('id');
      });
  }

}

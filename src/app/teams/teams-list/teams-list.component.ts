import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@core/models';
import { UserService } from '@core/services';

@Component({
  selector: 'ltb-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  teams: Team[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe( data => {
        this.teams = data['teams'];
      });
  }

  owner(team: Team): boolean {
    return team.user_id === this.userService.user.id;
  }

}

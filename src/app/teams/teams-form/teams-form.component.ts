import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Map, Team, Tier } from '@core/models';
import { NotifyService } from '@core/notify';
import { TeamService } from '@core/services';

@Component({
  selector: 'ltb-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: [ './teams-form.component.scss' ]
})
export class TeamsFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  maps: Map[];
  team: Team;
  tiers: Tier[];

  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private service: TeamService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe( data => {
        this.maps = data['maps'];
        this.tiers = data['tiers'];
        this.setupForm();
      });
  }

  changeMode(id: number, checked: boolean) {
    const modes: FormArray = this.form.get('modes') as FormArray;
    modes.controls
      .find(c => c.get('id').value === id)
      .get('checked')
      .patchValue(checked);
  }

  save() {
    this.submitted = true;
    if ( !this.form.valid ) {
      this.notify.warning('Verifique os dados informados');
      return;
    }
    const modes = this.form.value.modes;
    const atLeastOne = modes.reduce((r, m) => {
      if ( m.checked === true ) {
        r = true;
      }
      return r;
    }, false);

    if ( !atLeastOne ) {
      this.notify.warning('Selecione ao menos um modo de jogo!');
      return;
    }

    const team = this.form.value;
    team.modes = team.modes
      .filter(m => m.checked)
      .reduce((r, m) => {
        r.push(m.id);
        return r;
      }, []);

    this.service.store(team)
      .subscribe( response => {
        console.log(response);
      });
  }

  private setupForm() {
    this.form = this.fb.group({
      abbreviation: this.fb.control('', [
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.required
      ]),
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]),
      tier_min: this.fb.control(null, Validators.required),
      modes: this.fb.array(this.modesArrayControl())
    });
    console.log(this.form);
  }

  private modesArrayControl(): AbstractControl[] {
    return this.maps
      .reduce((r, m) => {
        return r.concat(m.modes.map(mode => mode.id));
      }, [])
      .map( m => {
        return this.fb.group({
          id: m,
          checked: false
        });
      });
  }

}

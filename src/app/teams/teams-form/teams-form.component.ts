import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maps } from '@core/enums';
import { Map, Team, Tier } from '@core/models';
import { NotifyService } from '@core/notify';
import { TeamService } from '@core/services';

@Component({
  selector: 'ltb-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: [ './teams-form.component.scss' ]
})
export class TeamsFormComponent implements OnInit {

  editing = false;
  form: FormGroup;
  submitted = false;

  @Input() maps: Map[];
  @Input() team: Team;
  @Input() tiers: Tier[];

  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private service: TeamService
  ) { }

  ngOnInit() {
    this.editing = this.team.id !== null;
    this.setupForm();
  }

  optionsByMap(mapName: string): AbstractControl[] {
    if ( !this.form || !this.form.get(mapName) ) {
      return null;
    }
    const control = this.form.get(mapName) as FormArray;
    return control.controls;
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
    const team = JSON.parse(JSON.stringify(this.form.value));
    const modes = team.summonersRift.concat(team.twistedTreeline).concat(team.howlingAbyss);
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

    delete team.howlingAbyss;
    delete team.summonersRift;
    delete team.twistedTreeline;

    team.modes = modes
      .filter(m => m.checked)
      .reduce((r, m) => {
        r.push({
          id: m.id
        });
        return r;
      }, []);

    this.service.store(team)
      .subscribe(response => {
        if ( !this.editing ) {
          this.notify.success('Criado com sucesso!');
        } else {
          this.notify.success('Alterado com sucesso');
        }
        this.router.navigate([ '/teams' ]);
      });
  }

  private setupForm() {
    this.form = this.fb.group({
      id: this.fb.control(this.team.id),
      abbreviation: this.fb.control(this.team.abbreviation, [
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.required
      ]),
      name: this.fb.control(this.team.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]),
      tier_min: this.fb.control(this.team.tier_min, Validators.required),
      summonersRift: this.fb.array(
        this.modesByMapId(Maps.SummonersRift)
          .sort( (a, b) => {
            return a.get('id').value - b.get('id').value;
          })
      ),
      twistedTreeline: this.fb.array(
        this.modesByMapId(Maps.TwistedTreeline)
          .sort( (a, b) => {
            return a.get('id').value - b.get('id').value;
          })
      ),
      howlingAbyss: this.fb.array(this.modesByMapId(Maps.HowlingAbyss)),
    });
  }

  private modesByMapId(mapId: Maps): AbstractControl[] {
    const map = this.maps.find(m => m.id === mapId);
    return map.modes
      .reduce((r, mode) => {
        let checked = false;

        if ( this.editing ) {
          checked = this.team.modes.findIndex(m => m.id === mode.id) !== -1;
        }

        r.push(this.fb.group({
          id: mode.id,
          name: mode.name,
          checked: checked
        }));
        return r;
      }, []);
  }

}

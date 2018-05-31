import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/models';
import { Region } from '@core/models/region.model';
import { NotificationPosition, NotificationType, NotifyService } from '@core/notify';
import { AccountService, AuthService, UserService } from '@core/services';

@Component({
  selector: 'ltb-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: [ './account-edit.component.scss' ]
})
export class AccountEditComponent implements OnInit {

  editing = false;
  form: FormGroup;
  regions: Region[];
  user: User;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private service: AccountService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.regions = data[ 'regions' ];
      });
    this.user = this.userService.user || new User();
    if ( this.user.id ) {
      this.editing = true;
    }
    this.setupForm();
  }

  save() {
    this.submitted = true;
    if ( !this.form.valid ) {
      this.notify.warning('Verifique os dados informados!');
      return;
    }
    const user = JSON.parse(JSON.stringify(this.form.getRawValue()));
    if ( user.password !== user.confirm ) {
      this.notify.warning('As senhas não conferem!');
      return;
    }
    delete user.confirm;
    this.service
      .create(user)
      .subscribe(r => {
        this.authService.token = r.token;
        this.authService.loggedIn$.next(r.data);
        this.router
          .navigate([ '/vacancies' ]);
      });
  }

  private setupForm() {
    this.form = this.fb.group({
      'id': this.fb.control(this.user.id),
      'nickname': this.fb.control(this.user.nickname, Validators.required),
      'email': this.fb.control(this.user.email, [ Validators.email, Validators.required ]),
      'region_id': this.fb.control(this.user.region_id, Validators.required),
      'password': this.fb.control('', Validators.required),
      'confirm': this.fb.control('', [ Validators.required, this.validatePassword ])
    });

    if ( this.user.id ) {
      this.form.get('nickname').disable();
      this.form.get('email').disable();
    }
  }

  private validatePassword(control: AbstractControl) {
    const form = control.root;
    if ( !form.get('password') ) {
      return null;
    }
    if ( control.value !== form.get('password').value ) {
      return { passwordsMismatch: true };
    }
    return null;
  }

}

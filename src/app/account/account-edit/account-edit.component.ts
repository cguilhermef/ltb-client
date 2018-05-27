import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationPosition, NotificationType, NotifyService } from '@core/notify';
import { AccountService, AuthService, UserService } from '@core/services';

@Component({
  selector: 'ltb-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: [ './account-edit.component.scss' ]
})
export class AccountEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotifyService,
    private router: Router,
    private service: AccountService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setupForm();
    // this.notify.create({
    //   position: NotificationPosition.topRight,
    //   showClose: true,
    //   timeout: 0,
    //   title: 'Verifique os dados informados!',
    //   type: NotificationType.error
    // });
  }

  save() {
    this.form.markAsTouched();
    if (!this.form.valid) {
      this.notify.warning('Verifique os dados informados!', 0);
      return;
    }
    const user = JSON.parse(JSON.stringify(this.form.value));
    if (user.password !== user.confirm) {
      this.notify.warning('As senhas não conferem!');
      return;
    }
    delete user.confirm;
    this.service
      .create(user)
      .subscribe( r => {
        this.authService.token = r.token;
        this.authService.loggedIn$.next(r.data);
        this.router
          .navigate(['/vacancies']);
      });
  }

  private setupForm() {
    this.form = this.fb.group({
      'nickname': this.fb.control('', Validators.required),
      'email': this.fb.control('', [ Validators.email, Validators.required ]),
      'region_id': this.fb.control('', Validators.required),
      'password': this.fb.control('', Validators.required),
      'confirm': this.fb.control('', [Validators.required, this.validatePassword])
    });
  }

  private validatePassword(control: AbstractControl) {
    const form = control.root;
    console.log(form);
    if (!form.get('password')) {
      return null;
    }
    if (control.value !== form.get('password').value) {
      return { passwordsMismatch: true };
    }
    return null;
  }

}

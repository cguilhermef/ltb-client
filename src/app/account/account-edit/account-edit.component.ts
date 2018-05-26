import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private router: Router,
    private service: AccountService
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  save() {
    if (!this.form.valid) {
      console.log('hup?');
      return;
    }
    const user = this.form.value;
    if (user.password !== user.confirm) {
      console.log('password != confirm');
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
      'confirm': this.fb.control('', Validators.required)
    });
  }

}

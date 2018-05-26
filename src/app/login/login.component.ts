import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services';

@Component({
  selector: 'ltb-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AuthService
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  login() {
    if ( !this.form.valid ) {
      return;
    }

    const { email, password } = this.form.value;
    this.service
      .login(email, password)
      .subscribe();
  }

  private setupForm() {
    this.form = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
  }

}

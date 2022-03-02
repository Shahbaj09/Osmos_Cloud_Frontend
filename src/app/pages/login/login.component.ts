import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/@constants/route-names';
import { Store } from 'src/app/@enums/enums';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serverError?: string;
  formType: string = 'a';
  LoginForm: FormGroup;
  VerifyEmailForm: FormGroup;
  message: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) {
    this.LoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]],
      password: [null, [Validators.required]],
    });
    this.VerifyEmailForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]],
    });
  }

  get f() {
    return this.LoginForm.controls;
  }

  ngOnInit(): void {
  }

  //Submit for Login
  login() {
    let payload = {
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password
    }

    this.auth.login(payload).subscribe((res: any) => {
      if (res.status) {
        localStorage.setItem(Store.token, res.token)
        localStorage.setItem(Store.userData, JSON.stringify(res.result));
        this.route.navigate([RouteNames.home])
      }
      else {
        this.serverError = res.message || 'Something went wrong!'
      }
    })
  }

  //Submit to forget password
  forgotPassword() {
    let payload = {
      email: this.VerifyEmailForm.value.email
    }
    this.auth.forgotPassword(payload).subscribe((res: any) => {
      if (res.status) {
        console.log(res);
        this.message = res.message;
        this.changeForm('c');
      } else {
        this.serverError = res.message || 'Something went wrong!'
      }
    })
  }

  //Form Toggle
  changeForm(form: string) {
    this.serverError = '';
    this.formType = form;
  }
}

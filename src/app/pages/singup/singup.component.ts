import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  isSignupDone: boolean = false;
  form: FormGroup;
  passwordCheck: boolean = false;
  serverError: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      confirmPassword: [null, [this.confirmValidator, Validators.required]],
    })
  }

  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
  }

  //Submit for Signup
  signUp() {
    let payload = {
      email: this.form.value.email,
      password: this.form.value.password,
      fullName: this.form.value.name
    }
    console.log(payload);
    this.auth.signup(payload).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.isSignupDone = true;
      } else {
        this.serverError = res.message || "Something went wrong!";
      }
    })
  }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.form.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  };
}

import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/@enums/enums';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  isPasswordSet: boolean = false;
  screen: String='a';
  form: FormGroup;
  passwordCheck: boolean =false;
  fpToken: any;
  userId: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe(prams=>{
        this.fpToken = prams.token;
        this.userId = prams.id;
        console.log(this.fpToken,'  ', this.userId);
        this.verifyPasswordToken()
      })

    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      confirmPassword: [null,[this.confirmValidator,Validators.required]],
    })
  }

  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
  }

  changeScreen(screenType: string){
    this.screen = screenType;
  }

  //Verify Password Token
  verifyPasswordToken(){
    let payload = {
      userId: this.userId,
      token: this.fpToken
    }
    this.auth.verifyPasswordToken(payload).subscribe((res: any)=>{
      if(res.status){
        console.log(res);
        localStorage.setItem(Store.token, res.message);
      }
      else{
        this.changeScreen('c');
      }
    })
  }

  //Submit for reset password
  resetPassword(){
    let payload = {
      password: this.form.value.password,
      token: this.fpToken
    }
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Authorization': `Bearer ${localStorage.getItem(Store.token)}`
    });
    const options = {headers};
    console.log(payload);
    this.auth.resetPassword(payload,options).subscribe((res: any)=>{
      console.log(res);
      if(res.status){
        this.changeScreen('b');
      }else{
        this.changeScreen('c');
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

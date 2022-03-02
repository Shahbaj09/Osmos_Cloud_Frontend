import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { api } from '../@endpoints/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //SignUp
  signup(payload: any): Observable<any>{
    console.log(api.auth.signup);
    return this.http.post(api.auth.signup, payload);
  }

  //Login
  login(payload: any): Observable<any>{
    return this.http.post(api.auth.login, payload);
  }

  // Forget Password
  forgotPassword(payload: any): Observable<any>{
    return this.http.post(api.auth.forgotPassword, payload);
  }

  //Reset Password
  resetPassword(payload: any, headers: any): Observable<any>{
    return this.http.post(api.auth.resetPassword, payload, headers);
  }

  //Verify Email
  verifyEmail(payload: any): Observable<any>{
    return this.http.post(api.auth.verifyEmail, payload);
  }

  //Resend Verification
  resendVerificationEmail(payload: any): Observable<any>{
    return this.http.post(api.auth.resendVerification, payload);
  }

  //Verify password token
  verifyPasswordToken(payload: any): Observable<any>{
    return this.http.post(api.auth.verifyPasswordToken, payload);
  }
}

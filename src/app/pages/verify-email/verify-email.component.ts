import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  userId: any;
  token: any;
  isVerifyDone: boolean= false;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
    ) {
    this.route.params.subscribe(prams=>{
      this.userId = prams.id;
      this.token = prams.token;
      this.verifyEmail();
    })
  }

  ngOnInit(): void {

  }

  //Verify Email
  verifyEmail(){
    let payload = {
      id: this.userId,
      token: this.token
    }

    this.auth.verifyEmail(payload).subscribe((res: any)=>{
      if(res.status){
        console.log(res);
        this.isVerifyDone = true;
      }
    })
  }
}

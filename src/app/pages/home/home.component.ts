import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/@enums/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string='';
  userData: any;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem(Store.userData) || '{}')
  }

  //Logout
  logout(){
    localStorage.clear();
    this.route.navigate(['/'])
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { Session } from './auth/login/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  public instance: AppComponent;
  title = 'web-app-frontend';
  public isLogedIn: Boolean = false;

  constructor(private router: Router) {
    this.instance = this;
   }

  session: Session;
  ngOnInit() {
    this.session = JSON.parse(window.localStorage.getItem('AppSession'));
    if(!this.session || new Date(this.session.endDate) < new Date()){
      this.router.navigate(['/login']);
    }
  }
}

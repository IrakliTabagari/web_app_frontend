import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service'
import {Router} from "@angular/router";
import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../auth/login/session';

@Component({
  selector: 'application-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    

  constructor(private sidenav: SidenavService,
              private http: Http, 
              private router: Router) {}


  session: Session;
  httpOptions;
  ngOnInit() {
    this.session = JSON.parse(window.localStorage.getItem('AppSession'));
    this.httpOptions = {
      headers: new Headers({
        'Content-Type':  'application/json',
        'sessionId': this.session._id.toString(),
        'userName': this.session.user.userName.toString(),
      })
    }; 
  }

  toggleActive:boolean = false;
  
  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();
  }

  


  newSession: Session;
  logOut(){        
    console.log(this.session);
    this.http.post("http://localhost:3000/api/users/logout", this.session, this.httpOptions)
      .subscribe(response => {
        this.newSession = response.json();        
        console.log(this.newSession);

        if(this.newSession && this.newSession._id && this.newSession.state.name === "Inactive"){          
          window.localStorage.removeItem('AppSession');
          this.router.navigate(['/login']);
        }
        // else{
        //   this.loginStatus = response.json().warning;
        // }
      });
  }
}

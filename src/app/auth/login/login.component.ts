import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from './session';
//import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 // @Input() parent;

  constructor(private http: Http, private router: Router) { 
    
  }

  session: Session;

  ngOnInit() {
    this.session = JSON.parse(window.localStorage.getItem('AppSession'));
    if(this.session && new Date(this.session.endDate) > new Date()){
      this.router.navigate(['/app']);
    }
   }

  httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'//,
     // 'Authorization': 'my-auth-token'
    })
  };

  login = {
    'userName' : "",
    'password' : ""
  };

  newSession: Session;
  loginStatus: String;
  
  onSubmit(form: NgForm){
    this.login = {
      'userName' : form.value.userName,
      'password' : form.value.password
    };
    
    this.http.post("http://localhost:3000/api/users/login", this.login, this.httpOptions)
      .subscribe(response => {
        window.localStorage.removeItem('AppSession');
        this.newSession = response.json();        
        console.log(this.newSession);
        window.localStorage.setItem('AppSession',  JSON.stringify(this.newSession))

        if(this.newSession && this.newSession._id){
          this.router.navigate(['/app']);
        }else{
          this.loginStatus = response.json().warning;
        }
      }, error => {
        this.loginStatus = error.json().warning;
      });
  }

}

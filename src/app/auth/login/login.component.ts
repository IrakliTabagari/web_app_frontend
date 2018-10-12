import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import {Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { Session } from './session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 // @Input() parent;

  constructor(private http: Http, private router: Router) { 
    
  }

  ngOnInit() {
    //if(this.parent == true) this.router.navigate(['/app']);
   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'//,
     // 'Authorization': 'my-auth-token'
    })
  };

  login = {
    'userName' : "",
    'password' : ""
  };

  session: Session;
  onSubmit(form: NgForm){
    this.login = {
      'userName' : form.value.userName,
      'password' : form.value.password
    };
    
    this.http.post("http://localhost:3000/api/users/login", this.login)
      .subscribe(response => {
        this.session = response.json();        
        console.log(this.session);
        window.localStorage.setItem('AppSession',  JSON.stringify(this.session))
        if(this.session && this.session._id){
          //this.parent = true;
          this.router.navigate(['/app']);
        }
      });
  }

}

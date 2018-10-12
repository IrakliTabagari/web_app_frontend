import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../auth/login/session';
import { User } from '../auth/login/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "http://localhost:3000/api/users";
  session: Session = JSON.parse(window.localStorage.getItem('AppSession'));
  users: User[];
  httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json',
      'sessionId': this.session._id.toString(),
      'userName': this.session.user.userName.toString(),
    })
  };

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(this.url, this.httpOptions);
  }

  getUser(id: String){
    return this.http.get(this.url+'/'+id, this.httpOptions);
  }

  addtUser(newUser: User){
    return this.http.post(this.url, newUser, this.httpOptions);
  }

  updatetUser(editedUser: User){
    return this.http.put(this.url, editedUser, this.httpOptions);
  }


}

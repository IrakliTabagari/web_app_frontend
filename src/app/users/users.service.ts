import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import { Headers } from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import { Session } from '../auth/login/session';
import { User } from '../auth/login/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "http://localhost:3000/api/users";
  private rightsUrl = "http://localhost:3000/api/userRights";
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

  getAllRights(){
    return this.http.get(this.rightsUrl, this.httpOptions);
  }

  updateUserRights(editedUser: User){
    return this.http.put(this.rightsUrl+'/'+editedUser._id, editedUser, this.httpOptions);
  }

  getUser(id: String){
    return this.http.get(this.url+'/'+id, this.httpOptions);
  }

  addUser(newUser: User){
    delete newUser._id;
    delete newUser.state;
    delete newUser.rights;
    delete newUser.__v;
    return this.http.post(this.url, newUser, this.httpOptions);
  }

  updatetUser(editedUser: User){
    return this.http.put(this.url+'/'+editedUser._id, editedUser, this.httpOptions);
  }

  deleteUser(id: String){
    return this.http.delete(this.url+'/'+id, this.httpOptions);
  }

  activateUser(newUser: User){
    return this.http.post(this.url+'/activate', newUser, this.httpOptions);
  }

  resetPassword(newUser: User){
    return this.http.post(this.url+'/resetPassword', newUser, this.httpOptions);
  }

}

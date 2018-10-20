import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../auth/login/user';
import { Session } from '../auth/login/session'
import { UsersService } from '../users/users.service';

import { StatusSnackbarComponent} from '../shared/status-snackbar/status-snackbar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  session: Session;
  constructor(private userService: UsersService,
              public snackBar: MatSnackBar) { }

  user: User;
  ngOnInit() {
    this.session = JSON.parse(window.localStorage.getItem('AppSession'));
    this.user = this.session.user;
  }

  showResetPassword: Boolean;
  showChangePassword(){
    this.showResetPassword = !this.showResetPassword;
    this.oldPassword = "";
    this.newPassword1 = "";
    this.newPassword2 = "";
  }

  oldPassword: String = "";
  newPassword1: String = "";
  newPassword2: String = "";
  passwordReseted: Boolean;
  resetButton: Boolean;
  changePassword(){
    if(this.oldPassword != ""
      && this.oldPassword.length>=5
      && this.newPassword1 != ""
      && this.newPassword1.length>=5
      && this.newPassword2 != ""
      && this.newPassword2.length>=5
      && this.newPassword1 == this.newPassword2      
      ){
        //this.user.
        //this.user.password = this.newPassword1;
        this.userService.changePassword({
                                          userName: this.session.user.userName,
                                          oldPassword: this.oldPassword,
                                          newPassword: this.newPassword1
                                        })
          .subscribe(response => {
            this.user = response.json();
            this.openSnackBar(`${this.user.userName}'s password was changed`);
          });
        this.resetButton = true;
    }else {
      this.resetButton = false;
    }

  }

  
  matchError: Boolean = false;
  onKey(event: any){
    if(this.oldPassword != ""
      && this.oldPassword.length>=5
      && this.newPassword1 != ""
      && this.newPassword1.length>=5
      && this.newPassword2 != ""
      && this.newPassword2.length>=5
      && this.newPassword1 == this.newPassword2      
      ){
        this.matchError = false;
        this.resetButton = true;
    }else {
      this.resetButton = false;
      if(this.newPassword1 !== this.newPassword2  ) this.matchError = true;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(StatusSnackbarComponent, {
      data: message,
      duration: 2000,
    });
  }

  userName: String;
  password: String;
  email: String;
  editError: String;
    editSuccess: String;
    updateUser(form: NgForm){
      this.user.userName = this.userName;
      this.user.password = this.password;
      this.user.email = this.email;
      console.log(this.user);
      
      this.userService.updatetUser(this.user)
        .subscribe(response => {
        this.user = response.json();
        console.log(this.user);
      },error => {
        this.editError = error.json().warning;
      });

    }

}

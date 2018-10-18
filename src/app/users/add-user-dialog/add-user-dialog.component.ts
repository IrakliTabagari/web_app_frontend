import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import { NgForm } from '@angular/forms';

//import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../../auth/login/session';
import { User } from '../../auth/login/user';
import { UsersService } from '../users.service';



@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'add-user-dialog.component.html',
    styleUrls: ['add-user-dialog.component.css']
  })
  export class AddUserDialogComponent {
    newUserUserName: String = "";
    newUserPassword1: String = "";
    newUserPassword2: String = "";
    newUserEmail: String = "";

    constructor(private userService: UsersService){

    }

    newUser: User = {
        _id: null,
        userName: "",
        password: "",
        email: "",
        state: null,
        rights: [null],
        __v: null
    };

  
    addError:String;
    addSuccess:String;
    addUser(){
      this.newUser.userName = this.newUserUserName;
      this.newUser.password = this.newUserPassword1;
      this.newUser.email = this.newUserEmail;
      console.log(this.newUser);
      
      this.userService.addUser(this.newUser)
      .subscribe(response => {
        this.newUser = response.json();
        console.log(this.newUser);
        this.addError = "";
        this.addSuccess = this.newUser.userName.toString() + " was added succesfully";
      },error => {
        this.addError = error.json().warning;
      });
    }

    
    showAddButton: Boolean;
    matchError: Boolean = false;
    onKey(event: any){
      if(this.newUserUserName  != ""
        && this.newUserUserName.length>=5
        && this.newUserPassword1 != ""
        && this.newUserPassword1.length>=5
        && this.newUserPassword2 != ""
        && this.newUserPassword2.length>=5
        && this.newUserPassword1 == this.newUserPassword2  
        && this.newUserPassword2 != ""
        && this.newUserEmail.length>=5  
        ){
          this.matchError = false;
          this.showAddButton = true;
      }else {
        this.showAddButton = false;
        if(this.newUserPassword1 !== this.newUserPassword2  ) this.matchError = true;
      }
    }
  }
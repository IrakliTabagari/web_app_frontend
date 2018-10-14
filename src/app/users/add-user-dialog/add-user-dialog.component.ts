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

  
    onSubmit(form: NgForm){
      this.newUser.userName = form.value.newUserUserName;
      this.newUser.password = form.value.newUserPassword;
      this.newUser.email = form.value.newUserEmail;
      console.log(this.newUser);
      
      this.userService.addUser(this.newUser)
      .subscribe(response => {
        this.newUser = response.json();
        console.log(this.newUser);
      });
    }
  }
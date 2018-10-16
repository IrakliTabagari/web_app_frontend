import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import { NgForm } from '@angular/forms';

//import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../../auth/login/session';
import { User } from '../../auth/login/user';
import { UsersService } from '../users.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';



@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'edit-user-dialog.component.html',
    styleUrls: ['edit-user-dialog.component.css']
  })
  export class EditUserDialogComponent implements OnInit  {
  
    constructor(private userService: UsersService){

    }

    userId: String;
    user: User;

    ngOnInit() {
      this.userService.getUser(this.userId)
        .subscribe(response => {
        this.user = response.json();
        console.log(this.user);
      });
    }

    
    ngAfterViewInit(form: NgForm){
      form.value.userName = this.user.userName;
      form.value.password = this.user.password;
      form.value.email = this.user.email;
    }

  
    onSubmit(form: NgForm){
      this.user.userName = form.value.userName;
      this.user.password = form.value.password;
      this.user.email = form.value.email;
      console.log(this.user);
      
      this.userService.addUser(this.user)
        .subscribe(response => {
        this.user = response.json();
        console.log(this.user);
      });
    }
  }
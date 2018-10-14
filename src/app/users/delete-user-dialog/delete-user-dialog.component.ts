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
    templateUrl: 'Delete-user-dialog.component.html',
    styleUrls: ['Delete-user-dialog.component.css']
  })
  export class DeleteUserDialogComponent {
  
    userName: String;
    constructor(private userService: UsersService){}


  }
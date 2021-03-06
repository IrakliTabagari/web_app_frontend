import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { NgForm } from '@angular/forms';

//import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../auth/login/session';
import { User } from '../auth/login/user';
import { UsersService } from './users.service';

import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { StatusSnackbarComponent } from '../shared/status-snackbar/status-snackbar.component';
import { ActivateUserDialogComponent } from './activate-user-dialog/activate-user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['userName', 'state', 'email', 'edit', 'delete', 'activate'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar,
              private router: Router
              ) {
  }

  session: Session = JSON.parse(window.localStorage.getItem('AppSession'));
  users: User[];
  httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json',
      'sessionId': this.session._id.toString(),
      'userName': this.session.user.userName.toString(),
    })
  };

  rights: String[] = [];
  ngOnInit() {
    this.refreshUsers(); 
    this.session.user.rights.forEach(right => {
      this.rights.push(right.name.toString());
    }) 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newUser: User;
  addUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    
    dialogRef.afterClosed()
      .subscribe(result => {
        this.newUser = dialogRef.componentInstance.newUser; //result;//.json();
        if(this.newUser._id && this.newUser._id !== ""){
          this.refreshUsers(); 
        }
        console.log(`Dialog result: ${this.newUser}`);
      });
  }

  editUserDialog(userId) {
    const dialogRef = this.dialog.open(EditUserDialogComponent);
    dialogRef.componentInstance.userId = userId;
    
    dialogRef.afterClosed()
      .subscribe(result => {
        this.newUser = dialogRef.componentInstance.user; //result;//.json();
        if(this.newUser._id && this.newUser._id !== ""){
          if(!JSON.parse(window.localStorage.getItem('AppSession'))
            || this.newUser.userName === JSON.parse(window.localStorage.getItem('AppSession')).user.userName){
            window.localStorage.removeItem('AppSession');
            this.router.navigate(['/login']);
          }
          this.refreshUsers(); 
        }
        console.log(`Dialog result: ${this.newUser}`);
      });
  }

  deletedUser:User;
  deleteUserDialog(userId) {
    this.deletedUser = this.users.find(obj => obj._id == userId);;
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
    console.log(`Selected User: ${this.deletedUser._id}`);
    dialogRef.componentInstance.userName = this.deletedUser.userName;

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result == true){
          this.userService.deleteUser(userId)
          .subscribe(response => {
            this.deletedUser = response.json();
            this.openSnackBar(`${this.deletedUser.userName} was deleted`);            
            this.refreshUsers(); 
          });
        }       
      });
  }

  activatedUser:User;
  activateUserDialog(userId) {
    this.activatedUser = this.users.find(obj => obj._id == userId);;
    const dialogRef = this.dialog.open(ActivateUserDialogComponent);
    console.log(`Selected User: ${this.activatedUser._id}`);
    dialogRef.componentInstance.userName = this.activatedUser.userName;

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result == true){
          this.userService.activateUser(this.activatedUser)
          .subscribe(response => {
            this.activatedUser = response.json();
            this.openSnackBar(`${this.activatedUser.userName} was activated`);            
            this.refreshUsers(); 
          });
        }       
      });
  }

  refreshUsers(){
    this.userService.getUsers()
      .subscribe(response => {
        this.users = response.json();        
        //console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("Users Refreshed");
      });    
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(StatusSnackbarComponent, {
      data: message,
      duration: 2000,
    });
  }
}







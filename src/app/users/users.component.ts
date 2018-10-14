import { Component, OnInit, ViewChild } from '@angular/core';
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
import { StatusSnackbarComponent } from './status-snackbar/status-snackbar.component';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }

// /** Constants used to fill up our data base. */
// const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['userName', 'status', 'email', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar
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

  ngOnInit() {
    this.refreshUsers();  
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

  deleteUserDialog(selectedUser) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
    console.log(`Selected User: ${selectedUser}`);
    dialogRef.componentInstance.userName = selectedUser.userName;

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result == "true"){
          this.userService.deleteUser(selectedUser._id);
          this.refreshUsers(); 
        }
        console.log(`Dialog result: ${selectedUser}`);
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







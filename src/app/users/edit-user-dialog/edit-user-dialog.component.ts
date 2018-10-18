import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import { NgForm } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';

//import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../../auth/login/session';
import { User } from '../../auth/login/user';
import { Right }  from '../../auth/login/right';
import { UsersService } from '../users.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

import { StatusSnackbarComponent } from '../status-snackbar/status-snackbar.component';
import {MatSnackBar} from '@angular/material';


@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'edit-user-dialog.component.html',
    styleUrls: ['edit-user-dialog.component.css']
  })
  export class EditUserDialogComponent implements AfterContentChecked, OnInit  {
 
    constructor(private userService: UsersService,
                public snackBar: MatSnackBar,){

    }

    userId: String;
    user: User;

    form: NgForm;

    userName: String;
    password: String;
    email: String;

    displayedColumns: string[] = ['select', 'name'];
    dataSource;// = new MatTableDataSource<User>(ELEMENT_DATA);
    selection = new SelectionModel<Right>(true, []);

    usersRights;// = new MatTableDataSource<User>(ELEMENT_DATA);
    selectionUsersRights = new SelectionModel<Right>(true, []);

    allRights: Right[] = []
    ngOnInit() {
      this.userService.getUser(this.userId)
        .subscribe(response => {
        this.user = response.json();

        this.userName = this.user.userName;
        this.password = this.user.password;
        this.email = this.user.email;
        this.usersRights = new MatTableDataSource<Right>(this.user.rights.sort(this.compare));     
      });

      this.userService.getAllRights()
        .subscribe(response => {
        this.allRights = response.json().sort(this.compare);

        this.dataSource = new MatTableDataSource<Right>(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)).sort(this.compare));
        
        //this.selection = new SelectionModel<Right>(true, []);     
      });
    }

    
    ngAfterContentChecked(){
      
      
    }

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

      this.userService.updateUserRights(this.user)
        .subscribe(response => {
        this.user = response.json();
        console.log(this.user);
        this.usersRights = new MatTableDataSource<Right>(this.user.rights.sort(this.compare));
        this.dataSource = new MatTableDataSource<Right>(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)).sort(this.compare));
        this.selectionUsersRights.clear();
        this.selection.clear();
        if(this.user.userName === JSON.parse(window.localStorage.getItem('AppSession')).user.userName){
          window.localStorage.removeItem('AppSession');
        }
      },error => {
        this.editError = error.json().warning;
      });
    }


    
 

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllUsersRightsSelected() {
    const numSelected = this.selectionUsersRights.selected.length;
    const numRows = this.usersRights.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterUsersRightsToggle() {
    this.isAllSelected() ?
        this.selectionUsersRights.clear() :
        this.usersRights.data.forEach(row => this.selectionUsersRights.select(row));
  }

  addRights(){
    //console.log(this.allRights.filter(right => !this.selection.selected.some(r => r.name===right.name)));
    this.user.rights = this.user.rights.concat(this.selection.selected).sort(this.compare) as [Right];
    this.dataSource = new MatTableDataSource<Right>(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)).sort(this.compare));
    //this.user.rights = this.allRights.filter(right => !this.dataSource.some(r => r.name=== right.name)) as [Right];
    
    this.usersRights = new MatTableDataSource<Right>(this.user.rights);  
    this.selectionUsersRights.clear();
    this.selection.clear();
    
    //this.dataSource.clear();
    
  }

  removeRights(){
    this.user.rights = this.user.rights.filter(right => !this.selectionUsersRights.selected.some(r => r.name=== right.name)).sort(this.compare) as [Right];
    this.usersRights = new MatTableDataSource<Right>(this.user.rights);  
    this.selectionUsersRights.clear();
    this.selection.clear();
    
    //this.dataSource.clear();
    this.dataSource = new MatTableDataSource<Right>(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)).sort(this.compare));
  }

  compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  showResetPassword: Boolean;
  showResetDialog(){
    this.showResetPassword = !this.showResetPassword;

  }

  newPassword1: String = "";
  newPassword2: String = "";
  passwordReseted: Boolean;
  resetButton: Boolean;
  resetPassword(){
    if(this.newPassword1 != ""
      && this.newPassword1.length>=5
      && this.newPassword2 != ""
      && this.newPassword2.length>=5
      && this.newPassword1 == this.newPassword2      
      ){
        this.user.password = this.newPassword1;
        this.userService.resetPassword(this.user)
          .subscribe(response => {
            this.user = response.json();
            this.openSnackBar(`${this.user.userName}'s password was reseted`);
          });
        this.resetButton = true;
    }else {
      this.resetButton = false;
    }

  }

  
  matchError: Boolean = false;
  onKey(event: any){
    if(this.newPassword1 != ""
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

}
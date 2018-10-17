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



@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'edit-user-dialog.component.html',
    styleUrls: ['edit-user-dialog.component.css']
  })
  export class EditUserDialogComponent implements AfterContentChecked, OnInit  {
 
    constructor(private userService: UsersService){

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
        this.usersRights = new MatTableDataSource<Right>(this.user.rights);     
      });

      this.userService.getAllRights()
        .subscribe(response => {
        this.allRights = response.json();
        console.log(this.allRights);

        this.dataSource = new MatTableDataSource<Right>(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)));
        
        //this.selection = new SelectionModel<Right>(true, []);     
      });
    }

    
    ngAfterContentChecked(){
      
      
    }

    editError: String;
    editSuccess: String;
    onSubmit(form: NgForm){
      this.user.userName = form.value.userName;
      this.user.password = form.value.password;
      this.user.email = form.value.email;
      console.log(this.user);
      
      this.userService.addUser(this.user)
        .subscribe(response => {
        this.user = response.json();
        console.log(this.user);
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


  }

  removeRights(){
    console.log(this.user.rights.filter(right => !this.selectionUsersRights.selected.some(r => r.name=== right.name)) as [Right]);
    this.user.rights = this.user.rights.filter(right => !this.selectionUsersRights.selected.some(r => r.name=== right.name)) as [Right];
    this.usersRights = new MatTableDataSource<Right>(this.user.rights);  
    this.selectionUsersRights.clear();

    console.log(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)));
    //this.dataSource.clear();
    this.dataSource = new MatTableDataSource<Right>(this.allRights.filter(right => !this.user.rights.some(r => r.name===right.name)));
  }
}
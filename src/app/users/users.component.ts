import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Session } from '../auth/login/session';
import { User } from '../auth/login/user';
import { UsersService } from './users.service';

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


  displayedColumns: string[] = ['userName', 'status', 'e-mail'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService) {
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
    this.userService.getUsers()
      .subscribe(response => {
        this.users = response.json();        
        //console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };

// }

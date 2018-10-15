import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service'
import { MatSidenav } from '@angular/material';

import { Session } from '../auth/login/session';


@Component({
  selector: 'application-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  @ViewChild('sidenav') public sidenav: MatSidenav;

  session: Session = JSON.parse(window.localStorage.getItem('AppSession'));
  rights: String[] = [];

  constructor(private sidenavService: SidenavService) {

  }

  
  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.session = JSON.parse(window.localStorage.getItem('AppSession'));
    this.session.user.rights.forEach(right => {
      this.rights.push(right.name.toString());
    })
  }

  // checkRight(rightName: String){
  //   return 
  // }


}

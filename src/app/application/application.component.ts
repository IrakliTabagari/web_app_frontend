import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../sidenav/sidenav.service'

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  
  constructor(private router: Router, 
              private sidenavService: SidenavService) {
                
  }

  ngOnInit() {
    //this.sidenavService.setSidenav(this.sidenav);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service'
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'application-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }


}

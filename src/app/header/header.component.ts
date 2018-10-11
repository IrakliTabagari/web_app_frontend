import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service'

@Component({
  selector: 'application-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    

  constructor(private sidenav: SidenavService) {}

  ngOnInit() {
  }

  toggleActive:boolean = false;
  
  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();

    console.log('Clicked');
  }
}

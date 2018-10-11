import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  public instance: AppComponent;
  title = 'web-app-frontend';
  public isLogedIn: Boolean = false;

  constructor(private router: Router) {
    this.instance = this;
   }

  ngOnInit() {
    if(this.isLogedIn == true /* && this.router.url == '/login' */){
      console.log("User is Loged in");
      console.log(this.router.url);
      this.router.navigate(['/app']);
    }
    else{
      console.log("User is not Loged in");
      console.log(this.router.url);
      this.router.navigate(['/login']);
    }
   }
}

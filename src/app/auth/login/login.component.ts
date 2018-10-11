import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Input() parent;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.parent == true) this.router.navigate(['/app']);
   }

  onSubmit(form: NgForm){
    console.log(form.value);
    if(form.value.userName == "admin" && form.value.password == "admin"){
      this.parent = true;
      this.router.navigate(['/app']);
    }
    
  }

}

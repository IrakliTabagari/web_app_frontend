import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';



@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ],
  declarations: [
    UsersComponent
  ],
  providers:[
    UsersService
  ]
})
export class UsersModule { }

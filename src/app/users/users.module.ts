import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component'



@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ],
  declarations: [
    UsersComponent
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UsersService } from './users.service';

import { FormsModule }   from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    AddUserDialogComponent, 
    AddUserDialogComponent
  ],
  declarations: [
    UsersComponent,
    AddUserDialogComponent
  ],
  providers:[
    UsersService
  ]
})
export class UsersModule { }

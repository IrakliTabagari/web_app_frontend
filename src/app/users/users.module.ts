import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
//import { Observable } from 'rxjs/Observable';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { StatusSnackbarComponent } from './status-snackbar/status-snackbar.component';
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
    DeleteUserDialogComponent,
    EditUserDialogComponent,
    StatusSnackbarComponent
  ],
  declarations: [
    UsersComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    EditUserDialogComponent,
    StatusSnackbarComponent
  ],
  providers:[
    UsersService
  ]
})
export class UsersModule { }

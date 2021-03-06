import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
//import { Observable } from 'rxjs/Observable';

import { UsersRoutingModule } from './users-routing.module';
//import { StatusSnackbarModule } from '../shared/status-snackbar/status-snackbar.module';
import { UsersComponent } from './users.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
//import { StatusSnackbarComponent} from '../shared/status-snackbar/status-snackbar.component';
import { SharedModule } from '../shared/shared.module';
import { ActivateUserDialogComponent } from './activate-user-dialog/activate-user-dialog.component';
import { UsersService } from './users.service';

import { FormsModule }   from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
    //,StatusSnackbarModule
  ],
  entryComponents: [
    AddUserDialogComponent, 
    DeleteUserDialogComponent,
    EditUserDialogComponent,
    ActivateUserDialogComponent,
    //StatusSnackbarComponent
  ],
  declarations: [
    UsersComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    EditUserDialogComponent,
    ActivateUserDialogComponent,
    //StatusSnackbarComponent
  ],
  providers:[
    UsersService
  ]
})
export class UsersModule { }

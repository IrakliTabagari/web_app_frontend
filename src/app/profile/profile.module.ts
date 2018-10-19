import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule }   from '@angular/forms';

import { StatusSnackbarComponent } from '../users/status-snackbar/status-snackbar.component'

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    StatusSnackbarComponent
  ],
  declarations: [
    ProfileComponent,
    StatusSnackbarComponent
  ]
})
export class ProfileModule { }

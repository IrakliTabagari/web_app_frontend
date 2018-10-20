import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
   // ProfileStatusSnackbarComponent
  ],
  declarations: [
    ProfileComponent,
   // ProfileStatusSnackbarComponent
  ]
})
export class ProfileModule { }

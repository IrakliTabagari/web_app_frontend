import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusSnackbarComponent } from './status-snackbar/status-snackbar.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatusSnackbarComponent
  ],
  exports: [
    StatusSnackbarComponent
  ],
  entryComponents: [
    StatusSnackbarComponent,
],
})
export class SharedModule { }

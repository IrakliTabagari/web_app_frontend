import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusSnackbarComponent } from './status-snackbar.component';

@NgModule({
  imports: [
    CommonModule,

  ],
  entryComponents: [
    StatusSnackbarComponent
  ],
  declarations: [
    StatusSnackbarComponent
  ],
  exports: [
    StatusSnackbarComponent
  ]
})
export class StatusSnackbarModule { }

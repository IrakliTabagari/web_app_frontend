import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
    selector: 'snack-bar-component-example-snack',
    templateUrl: 'status-snackbar.component.html',
    styles: ['status-snackbar.component.css'],
  })
  export class StatusSnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
  }
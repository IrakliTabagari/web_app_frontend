import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './auth/login/login.component'
import { ProfileComponent } from './profile.component'

const routes: Routes =[
    {   path: '', component: ProfileComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ProfileRoutingModule { }

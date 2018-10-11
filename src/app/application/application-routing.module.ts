import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './auth/login/login.component'
// import { ApplicationComponent } from './application/application.component'
import { UsersComponent } from '../users/users.component'

const routes: Routes =[
    { path: 'app/users', component: UsersComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component'
// import { ApplicationComponent } from './application/application.component'
import { ApplicationModule } from './application/application.module'
// import { UsersComponent } from './users/users.component'

const routes: Routes =[
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'app', loadChildren: () => ApplicationModule }// './application/application.module#ApplicationModule'}//
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
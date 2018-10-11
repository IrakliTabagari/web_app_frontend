import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component'
import { MainmenuComponent } from './mainmenu/mainmenu.component'
import { UsersComponent } from './users/users.component'

const routes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'app', component: MainmenuComponent},
    { path: 'app/users', component: UsersComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
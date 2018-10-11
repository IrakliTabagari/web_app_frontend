import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './auth/login/login.component'
import { UsersComponent } from './users.component'

const routes: Routes =[
    {   path: '', component: UsersComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

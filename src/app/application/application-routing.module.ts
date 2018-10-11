import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './auth/login/login.component'
import { ApplicationComponent } from './application.component'
import { UsersComponent } from '../users/users.component'
import { UsersModule } from '../users/users.module'

const routes: Routes =[
    {   
        path: '', component: ApplicationComponent,
        children: [
            { path: 'users', loadChildren: () => UsersModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule { }

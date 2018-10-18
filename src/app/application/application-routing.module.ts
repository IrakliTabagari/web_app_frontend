import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './auth/login/login.component'
import { ApplicationComponent } from './application.component'
import { UsersComponent } from '../users/users.component'
import { UsersModule } from '../users/users.module'
import { ProfileModule } from '../profile/profile.module'

const routes: Routes =[
    {   
        path: '', component: ApplicationComponent,
        children: [
            { path: 'users', loadChildren: () => UsersModule },
            { path: 'profile', loadChildren: () => ProfileModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule { }

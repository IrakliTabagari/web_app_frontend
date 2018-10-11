import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationComponent } from './application.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FooterComponent } from '../footer/footer.component';

//import { UsersModule } from '../users/users.module';

import { SidenavService } from '../sidenav/sidenav.service'

@NgModule({
  imports: [
    CommonModule,
    //UsersModule,
    ApplicationRoutingModule,
    MaterialModule
  ],
  declarations: [
    ApplicationComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  providers: [SidenavService],
})
export class ApplicationModule { }

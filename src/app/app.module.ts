import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { MaterialModule } from '@angular/material';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
//import { HeaderComponent } from './header/header.component';
//import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent,
    //SidemenuComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports:[
    //MatButtonModule,
    //MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/jobs.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
import { PrivateNavbarComponent } from './private-navbar/private-navbar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    JobsComponent,
    PublicNavbarComponent,
    PrivateNavbarComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

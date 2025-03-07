import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PublicNavbarComponent } from './public/public-navbar/public-navbar.component';
import { HomeComponent } from './public/home/home.component';
import { FooterComponent } from './public/footer/footer.component';
import { CompleteProfileRhComponent } from './rh/complete-profile-rh/complete-profile-rh.component';
import { DashboardRhComponent } from './rh/dashboard-rh/dashboard-rh.component';
import { PublicLayoutComponent } from './public/public-layout/public-layout.component';
import { CompleteProfileCComponent } from './candidate/complete-profile-c/complete-profile-c.component';
import { DashboardCComponent } from './candidate/dashboard-c/dashboard-c.component';
import { RhNavbarComponent } from './rh/rh-navbar/rh-navbar.component';
import { RhLayoutComponent } from './rh/rh-layout/rh-layout.component';
import { CandidateLayoutComponent } from './candidate/candidate-layout/candidate-layout.component';
import { CandidateNavbarComponent } from './candidate/candidate-navbar/candidate-navbar.component';
import { AddJobComponent } from './rh/add-job/add-job.component';
import {AuthInterceptor} from './auth.interceptor';
import { ViewProfileComponent } from './rh/view-profile/view-profile.component';
import { EditProfileComponent } from './rh/edit-profile/edit-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditJobComponent} from './rh/edit-job/edit-job.component';
import { FirstPageComponent } from './candidate/first-page/first-page.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { ViewProfileCComponent } from './candidate/view-profile-c/view-profile-c.component';
import { EditProfileCComponent } from './candidate/edit-profile-c/edit-profile-c.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ApplicationsComponent } from './candidate/applications/applications.component';
import { MatchedJobsComponent } from './jobs/matched-jobs/matched-jobs.component';
import { ApplicationsDashboardComponent } from './rh/applications-dashboard/applications-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PublicNavbarComponent,
    HomeComponent,
    FooterComponent,
    CompleteProfileRhComponent,
    DashboardRhComponent,
    PublicLayoutComponent,
    CompleteProfileCComponent,
    DashboardCComponent,
    RhNavbarComponent,
    RhLayoutComponent,
    CandidateLayoutComponent,
    CandidateNavbarComponent,
    AddJobComponent,
    ViewProfileComponent,
    EditProfileComponent,
    EditJobComponent,
    FirstPageComponent,
    JobListComponent,
    ViewProfileCComponent,
    EditProfileCComponent,
    ApplicationsComponent,
    MatchedJobsComponent,
    ApplicationsDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

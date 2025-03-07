import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './public/home/home.component';
import {CompleteProfileRhComponent} from './rh/complete-profile-rh/complete-profile-rh.component';
// import {RhAuthGuard} from './auth/rh-auth.guard';
import {DashboardRhComponent} from './rh/dashboard-rh/dashboard-rh.component';
import {PublicLayoutComponent} from './public/public-layout/public-layout.component';
import {PublicNavbarComponent} from './public/public-navbar/public-navbar.component';
import {FooterComponent} from './public/footer/footer.component';
import {RhNavbarComponent} from './rh/rh-navbar/rh-navbar.component';
import {RhLayoutComponent} from './rh/rh-layout/rh-layout.component';
import {AddJobComponent} from './rh/add-job/add-job.component';
import {AuthGuard} from './guard/auth.guard';
import {ViewProfileComponent} from './rh/view-profile/view-profile.component';
import {EditProfileComponent} from './rh/edit-profile/edit-profile.component';
import {EditJobComponent} from './rh/edit-job/edit-job.component';
import {CandidateLayoutComponent} from './candidate/candidate-layout/candidate-layout.component';
import {DashboardCComponent} from './candidate/dashboard-c/dashboard-c.component';
import {CompleteProfileCComponent} from './candidate/complete-profile-c/complete-profile-c.component';
import {FirstPageComponent} from './candidate/first-page/first-page.component';
import {JobListComponent} from './jobs/job-list/job-list.component';
import {ViewProfileCComponent} from './candidate/view-profile-c/view-profile-c.component';
import {EditProfileCComponent} from './candidate/edit-profile-c/edit-profile-c.component';
import {ApplicationsComponent} from './candidate/applications/applications.component';
import {MatchedJobsComponent} from './jobs/matched-jobs/matched-jobs.component';
import {ApplicationsDashboardComponent} from './rh/applications-dashboard/applications-dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  {
    path: 'rh',
    component: RhLayoutComponent,
    canActivate: [AuthGuard],  //canActivateChild: [AuthGuard],
    children: [
      { path: 'complete-profile', component: CompleteProfileRhComponent,canActivate: [AuthGuard]},
      { path: 'dashboard-rh', component: DashboardRhComponent,canActivate: [AuthGuard]},
      { path: 'add-job', component: AddJobComponent,canActivate: [AuthGuard]},
      { path: 'view-profile', component: ViewProfileComponent,canActivate: [AuthGuard]},
      { path: 'edit-profile', component: EditProfileComponent,canActivate: [AuthGuard]},
      { path: 'edit-job/:id', component: EditJobComponent,canActivate: [AuthGuard]},
      { path: 'applications', component: ApplicationsDashboardComponent,canActivate: [AuthGuard]},
    ],
  },
  {
    path: 'candidate',
    component: CandidateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'first-page', component: FirstPageComponent,canActivate: [AuthGuard]},
      { path: 'complete-profile-c', component: CompleteProfileCComponent,canActivate: [AuthGuard]},
      { path: 'job-list', component: JobListComponent,canActivate: [AuthGuard]},
      { path: 'matched-jobs', component: MatchedJobsComponent,canActivate: [AuthGuard]},
      { path: 'profile', component: ViewProfileCComponent,canActivate: [AuthGuard]},
      { path: 'edit-profile', component: EditProfileCComponent,canActivate: [AuthGuard]},
      { path: 'dashboard-c', component: DashboardCComponent,canActivate: [AuthGuard]},
      { path: 'applications', component: ApplicationsComponent,canActivate: [AuthGuard]},
    ],
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: '', component: PublicNavbarComponent },
      { path: '', component: FooterComponent }

    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

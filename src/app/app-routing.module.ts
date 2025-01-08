import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JobsComponent} from './jobs/jobs.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path:"jobs", component:JobsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent }
  //{ path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import {AuthService} from '../../Services/Auth/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.development';


const baseUrl = `${environment.API_URL}`;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful');
        this.authService.checkLoginStatus();

        // Check if the user has the RH role
        if (response.role === 'RH') {
          if (response.profileComplete === false) {
            // If profile is not complete, navigate to /rh/complete-profile
            console.log('Profile not complete, redirecting to /rh/complete-profile');
            this.router.navigate([`/rh/complete-profile`]);
          } else {
            // If profile is complete, navigate to /home
            console.log('Profile complete, redirecting to /dashboard');
            this.router.navigate([`/rh/dashboard-rh`]);
          }
        }

        else if(response.role === 'CANDIDATE') {
          if (response.profileComplete === false) {
            // If profile is not complete, navigate to /rh/complete-profile
            console.log('Profile not complete, redirecting to /candidate/complete-profile');
            this.router.navigate([`/candidate/complete-profile-c`]);
          } else {
            // If profile is complete, navigate to /home
            console.log('Profile complete, redirecting to /home');
            this.router.navigate(['/jobs']);
          }
        }

        else {
          console.error('Access denied: User is not an RH.');
          this.router.navigate(['/access-denied']);
        }

      },


      error => {
        console.error('Login failed:', error);
      }
    );
  }

}

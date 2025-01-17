import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userData = { username: '', email: '', password: '', role: '' };
  errorMessage: string = ''; // For displaying error messages
  isFormSubmitted: boolean = false; // For tracking form submission

  constructor(private authService: AuthService, private router: Router) {}


  register() {
    this.isFormSubmitted = true;

    if (!this.userData.username || !this.userData.email || !this.userData.password || !this.userData.role) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.authService.register(this.userData).subscribe(
      response => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }
}

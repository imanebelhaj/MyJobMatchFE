import { Component } from '@angular/core';
import {AuthService} from '../Services/Auth/auth.service';
import {Router} from '@angular/router';

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
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
}

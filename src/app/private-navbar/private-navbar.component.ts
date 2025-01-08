import { Component } from '@angular/core';
import {AuthService} from '../Services/Auth/auth.service';

@Component({
  selector: 'private-navbar',
  standalone: false,
  templateUrl: './private-navbar.component.html',
  styleUrl: './private-navbar.component.css'
})
export class PrivateNavbarComponent {
  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }


}

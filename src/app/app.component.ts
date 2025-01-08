import { Component } from '@angular/core';
import {AuthService} from './Services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyJobMatchFE';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}

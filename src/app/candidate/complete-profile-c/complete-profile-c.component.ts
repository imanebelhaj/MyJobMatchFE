import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../Services/Auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complete-profile-c',
  standalone: false,

  templateUrl: './complete-profile-c.component.html',
  styleUrl: './complete-profile-c.component.css'
})
export class CompleteProfileCComponent {
  profileData = {
    resumeUrl: '',
    fullName: '',
    linkedinUrl: '',
    phone: '',
    profilePictureUrl: '',
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  completeProfile() {
    this.http.put('api/candidate/complete-profile', this.profileData).subscribe(
      () => {
        alert('Profile updated successfully');
        this.authService.login({ username: '', password: '' });
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }

}

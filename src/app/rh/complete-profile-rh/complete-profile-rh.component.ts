import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RhService} from '../../Services/Rh/rh.service';
import {AuthService} from '../../Services/Auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';

const baseUrl = `${environment.API_URL}/rh`;

@Component({
  selector: 'app-complete-profile-rh',
  standalone: false,
  templateUrl: './complete-profile-rh.component.html',
  styleUrl: './complete-profile-rh.component.css'
})
export class CompleteProfileRhComponent  {

  profileForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private rhService: RhService,
    //private authService: AuthService,
    protected router: Router
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', Validators.required],
      department: ['', Validators.required],
      linkedinUrl: [
        '',
        [Validators.required, Validators.pattern(/https?:\/\/(www\.)?linkedin\.com\/.+/)],
      ],
      phone: ['', Validators.required],
      companyWebsite: [
        '',
        [Validators.required, Validators.pattern(/https?:\/\/.+/)],
      ],
      profilePictureUrl: ['', Validators.required],
    });
  }

  submitProfile() {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      this.rhService.completeProfile(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/rh/dashboard-rh']); // Navigate after successful profile completion
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
          this.isSubmitting = false;
        },
      });
    }
  }





  // profileData = {
  //   companyName: '',
  //   fullName: '',
  //   linkedinUrl: '',
  //   department: '',
  //   phone: '',
  //   companyWebsite: '',
  //   profilePictureUrl: '',
  // };

  // constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}
  //
  // completeProfile() {
  //   //sent to the backend
  //   this.http.put('${baseUrl}/complete-profile', this.profileData).subscribe(
  //     () => {
  //       alert('Profile updated successfully');
  //       this.router.navigate(['/dashboard-rh']);
  //     },
  //     (error) => {
  //       console.error('Error updating profile', error);
  //     }
  //   );
  // }
}

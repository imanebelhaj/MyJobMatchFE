import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RhService} from '../../Services/Rh/rh.service';

@Component({
  selector: 'app-edit-profile',
  standalone: false,

  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private rhService: RhService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      companyName: ['', Validators.required],
      fullName: ['', Validators.required],
      linkedinUrl: [''],
      department: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      companyWebsite: [''],
      profilePictureUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.loading = true;
    this.rhService.getProfile().subscribe({
      next: (data) => {
        this.editProfileForm.patchValue(data);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load profile data.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      this.loading = true;
      this.rhService.updateProfile(this.editProfileForm.value).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully.';
          this.loading = false;
          this.router.navigate(['/rh/view-profile']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update profile. Please try again.';
          this.loading = false;
        }
      });
    }
  }




}

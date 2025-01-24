import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RhService} from '../../Services/Rh/rh.service';
import {Router} from '@angular/router';
import {CandidateService} from '../../Services/Candidate/candidate.service';

@Component({
  selector: 'app-edit-profile-c',
  standalone: false,

  templateUrl: './edit-profile-c.component.html',
  styleUrl: './edit-profile-c.component.css'
})
export class EditProfileCComponent implements OnInit {
  editProfileForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      // companyName: ['', Validators.required],
      fullName: ['', Validators.required],
      linkedinUrl: [''],
      category: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      // companyWebsite: [''],
      //profilePictureUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.loading = true;
    this.candidateService.getProfile().subscribe({
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
      this.candidateService.updateProfile(this.editProfileForm.value).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully.';
          this.loading = false;
          this.router.navigate(['/candidate/profile']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update profile. Please try again.';
          this.loading = false;
        }
      });
    }
  }



}

import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../Services/Auth/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.development';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RhService} from '../../Services/Rh/rh.service';
import {CandidateService} from '../../Services/Candidate/candidate.service';


const baseUrl = `${environment.API_URL}/candidate`;
@Component({
  selector: 'app-complete-profile-c',
  standalone: false,

  templateUrl: './complete-profile-c.component.html',
  styleUrl: './complete-profile-c.component.css'
})

export class CompleteProfileCComponent {
  profileForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    protected router: Router
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      linkedinUrl: [''],
      website: [''],
      location: ['', Validators.required],
      category: ['', Validators.required],
      jobType: ['', Validators.required],
      resumeUrl: [''],
      coverLetterUrl: [''],
      status: ['', Validators.required],
      profilePictureUrl: [''],
      professionalSummary: [''],
      portfolioUrl: [''],
      education: [''],
      experience: [''],
      softSkills: [''],
      hardSkills: [''],
      languages: [''],
      certifications: [''],
      projects: [''],
    });
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      education: this.fb.array([]),
      experience: this.fb.array([]),
      softSkills: this.fb.array([]),
      // Add other fields here
    });
  }

  // Getters for form arrays
  get educationArray(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  get experienceArray(): FormArray {
    return this.profileForm.get('experience') as FormArray;
  }

  get softSkillsArray(): FormArray {
    return this.profileForm.get('softSkills') as FormArray;
  }

  // Add/Remove methods for dynamic fields
  addEducation() {
    this.educationArray.push(this.fb.group({ value: ['', Validators.required] }));
  }

  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }

  addExperience() {
    this.experienceArray.push(this.fb.group({ value: ['', Validators.required] }));
  }

  removeExperience(index: number) {
    this.experienceArray.removeAt(index);
  }

  addSoftSkill() {
    this.softSkillsArray.push(this.fb.group({ value: ['', Validators.required] }));
  }

  removeSoftSkill(index: number) {
    this.softSkillsArray.removeAt(index);
  }




  submitProfile() {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      this.candidateService.completeProfile(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/candidate/dashboard-c']); // Navigate after successful profile completion
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
          this.isSubmitting = false;
        },
      });
    }
  }


}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CandidateService} from '../../Services/Candidate/candidate.service';

@Component({
  selector: 'app-first-page',
  standalone: false,

  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css'
})

export class FirstPageComponent {

  form: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, protected router: Router, private http: HttpClient,private candidateService:CandidateService) {
    this.form = this.fb.group({
      resumeFile: [null],
    });
  }

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.form.patchValue({ resumeFile: file });
  //     document.getElementById('resume-box')?.classList.add('border-indigo-600');
  //     document.getElementById('form-box')?.classList.remove('border-indigo-600');
  //     document.getElementById('file-name')!.textContent = file.name;
  //     const fileURL = URL.createObjectURL(file);
  //     const pdfPreview = document.getElementById('pdf-preview') as HTMLIFrameElement;
  //     pdfPreview.src = fileURL;
  //     pdfPreview.style.display = 'block';
  //
  //   }
  // }
  //
  // submitForm(): void {
  //   this.isSubmitting = true;
  //   const formData = new FormData();
  //   if (this.form.get('resumeFile')?.value) {
  //     formData.append('resume', this.form.get('resumeFile')?.value);
  //   }
  //   this.candidateService.firstPage(formData).subscribe({
  //     next: (response) => {
  //       console.log('Form submitted with:', this.form.value);
  //       this.router.navigate(['/candidate/complete-profile-c']);
  //     },
  //     error: (err) => {
  //       console.error('Failed to update profile:', err);
  //       this.isSubmitting = false;
  //     }
  //   });
  //
  // }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ resumeFile: file });
      document.getElementById('resume-box')?.classList.add('border-indigo-600');
      document.getElementById('form-box')?.classList.remove('border-indigo-600');
      document.getElementById('file-name')!.textContent = file.name;
      const fileURL = URL.createObjectURL(file);
      const pdfPreview = document.getElementById('pdf-preview') as HTMLIFrameElement;
      if (pdfPreview) {
        pdfPreview.src = fileURL;
        pdfPreview.style.display = 'block';
      }
    }
  }

  submitForm(): void {
    this.isSubmitting = true;
    const file = this.form.get('resumeFile')?.value;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const byteArray = new Uint8Array(reader.result as ArrayBuffer);
        const payload = {
          resumePdf: Array.from(byteArray)
        };
        this.candidateService.firstPage(payload).subscribe({
          next: (response) => {
            console.log('Form submitted with:', this.form.value);
            this.router.navigate(['/candidate/complete-profile-c']);
          },
          error: (err) => {
            console.error('Failed to update profile:', err);
            this.isSubmitting = false;
          }
        });
      };
      reader.readAsArrayBuffer(file);
    }
    else{
      //complete profile manually
      console.log('Proceed to complete profile manually');
      this.router.navigate(['/candidate/complete-profile-c']);
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobsService} from '../../Services/Jobs/jobs.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RhService} from '../../Services/Rh/rh.service';

@Component({
  selector: 'app-add-job',
  standalone: false,

  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent  implements OnInit {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rhService: RhService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      maxApplications: [0, [Validators.required, Validators.min(1)]],
      jobType: ['Full-Time', Validators.required],
      salaryRange: ['', Validators.required],
      requiredSkills: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = { ...this.jobForm.value, requiredSkills: this.jobForm.value.requiredSkills.split(',') };
      this.rhService.createJob(formData).subscribe(
        (response) => {
          console.log('Job created successfully:', response);
          this.router.navigate(['/rh/dashboard-rh']); // Redirect to the job dashboard
        },
        (error) => {
          console.error('Error creating job:', error);
        }
      );
    }
  }
}

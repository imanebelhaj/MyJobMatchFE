import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RhService} from '../../Services/Rh/rh.service';
import {JobDto} from '../../models/JobDto';

@Component({
  selector: 'app-edit-job',
  standalone: false,

  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit {
  editJobForm: FormGroup;
  jobId!: number;

  constructor(
    private fb: FormBuilder,
    private rhService: RhService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editJobForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      maxApplications: ['', Validators.required],
      jobType: ['', Validators.required],
      salaryRange: ['', Validators.required],
      requiredEducation: ['', Validators.required],
      requiredExperience: ['', Validators.required],
      jobLevel: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJobDetails();
  }

  loadJobDetails(): void {
    this.rhService.getJobById(this.jobId).subscribe(
      (job: JobDto) => {
        const formattedDate = job.applicationDeadline
          ? new Date(job.applicationDeadline).toISOString().split('T')[0]
          : '';
        this.editJobForm.patchValue({
          ...job,
          applicationDeadline: formattedDate
        });
      },
      (error) => {
        alert('Failed to load job details');
      }
    );
  }
  onSubmit(): void {
    console.log('submit clicked', this.editJobForm.value); // Log form values

    if (this.editJobForm.valid) {
      // Convert requiredSkills from a string to an array if it's a string
      if (typeof this.editJobForm.value.requiredSkills === 'string') {
        this.editJobForm.patchValue({
          requiredSkills: this.editJobForm.value.requiredSkills.split(',')
        });
      }

      this.rhService.updateJob(this.jobId, this.editJobForm.value).subscribe(
        () => {
          alert('Job updated successfully');
          this.router.navigate(['/rh/dashboard-rh']);
        },
        (error) => {
          alert('Failed to update job');
        }
      );
    } else {
      console.log('form is invalid');
    }
  }


  // onSubmit(): void {
  //   console.log('submit clicked', this.editJobForm.value); // Log form values
  //   if (this.editJobForm.valid) {
  //     this.rhService.updateJob(this.jobId, this.editJobForm.value).subscribe(
  //       () => {
  //         alert('Job updated successfully');
  //         this.router.navigate(['/rh/dashboard-rh']);
  //       }
  //     );
  //   } else {
  //     console.log('form is invalid');
  //   }
  // }

}

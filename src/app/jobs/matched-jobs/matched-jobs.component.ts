import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {JobsService} from '../../Services/Jobs/jobs.service';
import {ApplicationsService} from '../../Services/Applications/applications.service';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Job {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  company: string;
  applicationDeadline: Date;
  postedAt: Date;
  maxApplications: number;
  status: string;
  jobType: string;
  salaryRange: string;
  requiredEducation: string;
  requiredExperience: string;
  jobLevel: string;
  requiredSkills: string[];
  rhName: string;
}

@Component({
  selector: 'app-matched-jobs',
  standalone: false,

  templateUrl: './matched-jobs.component.html',
  styleUrl: './matched-jobs.component.css'
})

export class MatchedJobsComponent implements OnInit {
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  appliedJobs: Set<number> = new Set();
  modalMessage: string = '';
  modalVisible: boolean = false;
  modalType: 'success' | 'error' | 'info' = 'success';

  constructor(private router: Router,private http: HttpClient,private jobService: JobsService,private applicationsService:ApplicationsService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {this.fetchJobs();}

  // fetchJobs(): void {
  //   this.jobService.getAllJobs().subscribe((data) => {
  //     this.jobs = data;
  //   });
  // }

  fetchJobs(): void {
    this.jobService.getMatchedJobs().subscribe((data) => {
      this.jobs = data;
    });
  }
  selectJob(job: Job): void {
    this.selectedJob = job;
    if (job) {
      this.checkIfApplied(job.id);
    }
  }
  applyForJob(jobId: number): void {
    this.applicationsService.applyForJob(jobId).subscribe(
      () => {
        this.appliedJobs.add(jobId);
        this.showModal('Application sent successfully!', 'success');
      },
      (error) => {
        if (error.status === 400) {
          this.showModal('You have already applied for this job.', 'error');
        } else {
          this.showModal('An error occurred. Please try again.', 'error');
        }
      }
    );
  }

  checkIfApplied(jobId: number): void {
    this.jobService.hasApplied(jobId).subscribe((hasApplied) => {
      if (hasApplied) {
        this.appliedJobs.add(jobId); // Mark the job as applied
      } else {
        this.appliedJobs.delete(jobId); // Ensure it's not marked as applied
      }
    });
  }

  // viewApplication(jobId:number):void{}

  viewApplication() {
    this.router.navigate(['/candidate/applications']);
  }

  showModal(message: string, type: 'success' | 'error'): void {
    this.modalMessage = message;
    this.modalType = type; // Set the type based on success or error
    this.modalVisible = true;
    setTimeout(() => {
      this.modalVisible = false;
    }, 5000); // Hide after 5 seconds
  }
}


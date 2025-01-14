import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/Auth/auth.service';
import {JobDto} from '../../models/JobDto';
import {RhService} from '../../Services/Rh/rh.service';

@Component({
  selector: 'app-dashboard-rh',
  standalone: false,

  templateUrl: './dashboard-rh.component.html',
  styleUrl: './dashboard-rh.component.css'
})
export class DashboardRhComponent implements OnInit {
  jobs: JobDto[] = [];
  filteredJobs: JobDto[] = [];
  selectedStatus: string = 'All';
  selectedJob: JobDto | null = null;

  constructor(private rhService: RhService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.rhService.getAllJobs().subscribe(
      (data) => {
        this.jobs = data;
        this.filterJobs();
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  filterJobs(): void {
    if (this.selectedStatus === 'All') {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter(job => job.status === this.selectedStatus);
    }
  }

  setFilter(status: string): void {
    this.selectedStatus = status;
    this.filterJobs();  // Re-filter jobs based on selected status
  }
  postJob(job: JobDto): void {
    if (confirm(`Are you sure you want to post the job "${job.title}"?`)) {
      this.rhService.postJob(job.id).subscribe(
        (updatedJob) => {
          job.status = updatedJob.status;
          alert('Job posted successfully!');
        },
        (error) => {
          console.error('Error posting job', error);
          alert('Failed to post the job. Please try again.');
        }
      );
    }
  }

  fetchJobDetails(jobId: number): void {
    this.rhService.getJobById(jobId).subscribe((response) => {
      if (this.selectedJob?.id === jobId) {
        this.selectedJob = null; // Toggle off if the same job is clicked
      } else {
        this.selectedJob = response; // Set the clicked job details
      }
    });
  }
  toggleJobDetails(jobId: number): void {
    this.selectedJob = this.selectedJob?.id === jobId ? null : this.filteredJobs.find(job => job.id === jobId) || null;
  }




  editJob(job: any) {
    // Implement your edit logic here
  }

  deleteJob(job: any) {
    // Implement your delete logic here
  }



  trackJob(job: any) {
    // Implement your track logic here
  }

  viewApplications(job: any) {
    // Implement your view applications logic here
  }

  archiveJob(job: any) {
    // Implement your archive logic here
  }



}




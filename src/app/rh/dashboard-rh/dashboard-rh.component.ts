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

  constructor(private rhService: RhService, private router: Router) {}

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

  // editJob(job: JobDto): void {
  //   this.router.navigate(['/rh/edit-job', job.id]);
  // }
  editJob(job: JobDto): void {
    const editJobUrl = `/rh/edit-job/${job.id}`;
    console.log('Navigating to:', editJobUrl);  // Debugging log
    this.router.navigate([editJobUrl]);
  }

  deleteJob(job: JobDto): void {
    if (confirm(`Are you sure you want to delete the job "${job.title}"? This action cannot be undone.`)) {
      this.rhService.deleteJob(job.id).subscribe(
        () => {
          alert('Job deleted successfully!');
          this.jobs = this.jobs.filter(j => j.id !== job.id); // Remove deleted job from the list
          this.filterJobs(); // Re-apply filter to update the displayed list
        },
        (error) => {
          console.error('Error deleting job', error);
          alert('Failed to delete the job. Please try again.');
        }
      );
    }
  }




  trackJob(job: any) {
    // Implement your track logic here
  }

  viewApplications(jobId:number) {
    this.router.navigate(['/rh/applications'], { queryParams: { jobId: jobId } });
  }


  archiveJob(job: any) {
    // Implement your archive logic here
  }



}




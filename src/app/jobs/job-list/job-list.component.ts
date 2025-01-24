import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobsService} from '../../Services/Jobs/jobs.service';
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
  selector: 'app-job-list',
  standalone: false,

  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  selectedJob: Job | null = null;

  constructor(private http: HttpClient,private jobService:JobsService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
  }

}

import { Component } from '@angular/core';
import { ApplicationDto } from '../../models/ApplicationDto';
import { ApplicationsService } from '../../Services/Applications/applications.service';
import { JobDto } from '../../models/JobDto';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer


@Component({
  selector: 'app-applications-dashboard',
  standalone: false,
  templateUrl: './applications-dashboard.component.html',
  styleUrls: ['./applications-dashboard.component.css'] // Corrected from `styleUrl` to `styleUrls`
})
export class ApplicationsDashboardComponent {
  applications: ApplicationDto[] = []; // Declare applications as an array of ApplicationDto
  jobId: number | null = null;
  filteredApplications: ApplicationDto[] = [];
  selectedStatus: string = 'All';
  resumePdfUrl: SafeResourceUrl | null = null;


  constructor(private route: ActivatedRoute,private applicationsService: ApplicationsService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'] ? +params['jobId'] : null; // Convert to number
      if (this.jobId !== null) {
        this.loadApplication();
      }
    });
  }

  loadApplication(): void {
    if (!this.jobId) {
      console.error('Job ID is not provided');
      return;
    }
    this.applicationsService.getApplicationsByJob(this.jobId).subscribe(
      (data: ApplicationDto[]) => {
        this.applications = data.map(application => ({
          ...application,
          candidateProfile: application.candidateProfileDto || { fullName: 'Unknown' } // Prevent undefined issues
        }));
        this.filterApplications();
      },
      (error) => {
        console.error('Error fetching applications', error);
      }
    );
  }


  filterApplications(): void {
    if (this.selectedStatus === 'All') {
      this.filteredApplications = this.applications;
    } else {
      this.filteredApplications = this.applications.filter(
        (app) => app.status === this.selectedStatus
      );
    }

  }

  setFilter(status: string): void {
    this.selectedStatus = status;
    this.filterApplications();
  }
  selectedCandidate: any = null;

  viewCandidate(application: any) {
    this.selectedCandidate = application;
    if (application.candidateProfileDto?.resumePdf) {
      this.resumePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(application.candidateProfileDto.resumePdf);
    } else {
      this.resumePdfUrl = null;
    }
  }


}

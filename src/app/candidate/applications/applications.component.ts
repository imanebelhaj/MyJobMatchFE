import { Component } from '@angular/core';
import {JobDto} from '../../models/JobDto';
import {RhService} from '../../Services/Rh/rh.service';
import {Router} from '@angular/router';
import {ApplicationsService} from '../../Services/Applications/applications.service';
import {ApplicationDto} from '../../models/ApplicationDto';

@Component({
  selector: 'app-applications',
  standalone: false,

  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {

  applications: ApplicationDto[] = [];
  filteredApplications: ApplicationDto[] = [];
  selectedStatus: string = 'All';
  selectedApplication : ApplicationDto | null =null;

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  // Fetch all applications
  loadApplications(): void {
    this.applicationsService.getApplications().subscribe(
      (data: ApplicationDto[]) => {
        this.applications = data;
        this.filterApplications();
      },
      (error) => {
        console.error('Error fetching applications', error);
      }
    );
  }

  // Filter applications based on selected status
  filterApplications(): void {
    if (this.selectedStatus === 'All') {
      this.filteredApplications = this.applications;
    } else {
      this.filteredApplications = this.applications.filter(
        (app) => app.status === this.selectedStatus
      );
    }
  }

  // Change the filter status
  setFilter(status: string): void {
    this.selectedStatus = status;
    this.filterApplications();
  }

  // fetchApplicationDetails(ApplicationId: number): void {
  //   this.applicationsService.getApplications().subscribe((response) => {
  //     if (this.selectedApplication?.id === ApplicationId) {
  //       this.selectedApplication = null; // Toggle off if the same job is clicked
  //     } else {
  //       this.selectedApplication = response; // Set the clicked job details
  //     }
  //   });
  // }
  // toggleJobDetails(jobId: number): void {
  //   this.selectedApplication = this.selectedApplication?.id === jobId ? null : this.filteredApplications.find(application => job.id === jobId) || null;
  // }


}

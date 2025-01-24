import {Component, OnInit} from '@angular/core';
import {RhProfileDto} from '../../models/RhPRofileDto';
import {RhService} from '../../Services/Rh/rh.service';
import {CandidateDto} from '../../models/CandidateDto';
import {CandidateService} from '../../Services/Candidate/candidate.service';

@Component({
  selector: 'app-view-profile-c',
  standalone: false,

  templateUrl: './view-profile-c.component.html',
  styleUrl: './view-profile-c.component.css'
})
export class ViewProfileCComponent implements OnInit{

  profile: CandidateDto | null = null;
  loading: boolean = true;
  error: string | null = null;
  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidateService.getProfile().subscribe(
      (data:CandidateDto) => {
        this.profile = data;
        this.loading = false;
      },
      (err) => {
        this.error = 'Error fetching profile data';
        this.loading = false;
      }
    );
  }



}

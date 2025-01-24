import { Component } from '@angular/core';
import {CandidateDto} from '../../models/CandidateDto';
import {RhService} from '../../Services/Rh/rh.service';
import {AuthService} from '../../Services/Auth/auth.service';
import {CandidateService} from '../../Services/Candidate/candidate.service';

@Component({
  selector: 'app-candidate-navbar',
  standalone: false,

  templateUrl: './candidate-navbar.component.html',
  styleUrl: './candidate-navbar.component.css'
})
export class CandidateNavbarComponent {
  isDropdownOpen = false;
  profile: CandidateDto | null = null;

  constructor(private candidateService: CandidateService, private authService: AuthService) {}

  ngOnInit(): void {
    this.candidateService.getProfile().subscribe((data: CandidateDto) => {
      this.profile = data;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown is now:', this.isDropdownOpen);
  }

  onLogout(): void {
    this.authService.logout();
  }

}

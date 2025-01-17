import { Component } from '@angular/core';
import { RhProfileDto } from '../../models/RhPRofileDto';
import { RhService } from '../../Services/Rh/rh.service';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-rh-navbar',
  standalone: false,
  templateUrl: './rh-navbar.component.html',
  styleUrls: ['./rh-navbar.component.css'],
})
export class RhNavbarComponent {
  isDropdownOpen = false;
  profile: RhProfileDto | null = null;

  constructor(private rhService: RhService, private authService: AuthService) {}

  ngOnInit(): void {
    this.rhService.getProfile().subscribe((data: RhProfileDto) => {
      this.profile = data;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown is now:', this.isDropdownOpen); // Debugging line
  }

  onLogout(): void {
    this.authService.logout();
  }
}

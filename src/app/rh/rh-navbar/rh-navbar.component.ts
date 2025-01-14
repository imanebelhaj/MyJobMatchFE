import { Component } from '@angular/core';
import {RhProfileDto} from '../../models/RhPRofileDto';
import {RhService} from '../../Services/Rh/rh.service';

@Component({
  selector: 'app-rh-navbar',
  standalone: false,

  templateUrl: './rh-navbar.component.html',
  styleUrl: './rh-navbar.component.css'
})
export class RhNavbarComponent {
  profile: RhProfileDto | null = null;

  constructor(private rhService: RhService) {}
  ngOnInit(): void {
    this.rhService.getProfile().subscribe(
      (data: RhProfileDto) => {
        this.profile = data;

      }
    );
  }

}

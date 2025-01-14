import {Component, OnInit} from '@angular/core';
import {RhService} from '../../Services/Rh/rh.service';
import {RhProfileDto} from '../../models/RhPRofileDto';

@Component({
  selector: 'app-view-profile',
  standalone: false,

  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit {
  profile: RhProfileDto | null = null;
  loading: boolean = true;
  error: string | null = null;
  constructor(private rhService: RhService) {}

  ngOnInit(): void {
    this.rhService.getProfile().subscribe(
      (data: RhProfileDto) => {
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

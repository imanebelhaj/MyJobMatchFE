import {Component, OnInit} from '@angular/core';
import {JobsService} from '../Services/Jobs/jobs.service';

@Component({
  selector: 'app-jobs',
  standalone: false,

  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit{

  jobs:any=[]

  constructor(private jobService:JobsService) {
  }

  ngOnInit(): void {
    this.getAllJobs()
  }


  getAllJobs(){
    this.jobService.getAllJobs().subscribe({
      next:data=>{
        console.log(data);
        this.jobs = data;
      },
      error:err => {
        console.log(err);
      }
    })
  }

}

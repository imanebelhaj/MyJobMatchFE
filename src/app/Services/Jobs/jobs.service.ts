import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment.development';

const JobsUrl = `${environment.API_URL}`+'/jobs'

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(public httpclient:HttpClient) { }


  getAllJobs():Observable<any>{
    return this.httpclient.get(JobsUrl);
  }


}

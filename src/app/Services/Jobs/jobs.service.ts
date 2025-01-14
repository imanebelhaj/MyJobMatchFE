import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment.development';

const JobsUrl = `${environment.API_URL}`+'/jobs'

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private authSecretKey = 'token'

  constructor(public httpclient:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.authSecretKey);

    const formattedToken = token ? token.trim() : '';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${formattedToken}`  // Attach the token without extra spaces
    });
  }

  getAllJobs():Observable<any>{
    return this.httpclient.get(JobsUrl);
  }




}

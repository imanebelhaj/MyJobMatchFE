import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment.development';

const baseUrl = `${environment.API_URL}`+'/candidate/jobs'

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
    const headers = this.getHeaders();
    return this.httpclient.get(`${baseUrl}/allJobs`, { headers });
  }





}

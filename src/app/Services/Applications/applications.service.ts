import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {JobDto} from '../../models/JobDto';
import {ApplicationDto} from '../../models/ApplicationDto';

const baseUrl = `${environment.API_URL}`+'/applications'

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
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

  applyForJob(jobId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpclient.post(`${baseUrl}/candidate/apply/${jobId}`, null, { headers }); // Pass `null` for the body
  }


  getApplications(): Observable<ApplicationDto[]> {
    return this.httpclient.get<ApplicationDto[]>(`${baseUrl}/candidate`, { headers: this.getHeaders() });
  }

  getApplicationsByJob(jobId: number): Observable<ApplicationDto[]> {
    return this.httpclient.get<ApplicationDto[]>(`${baseUrl}/rh/${jobId}`, { headers: this.getHeaders() });
  }


}

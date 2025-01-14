import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {JobDto} from '../../models/JobDto';
import {RhProfileDto} from '../../models/RhPRofileDto';

const baseUrl = `${environment.API_URL}/rh`;

@Injectable({
  providedIn: 'root'
})
export class RhService {
  private authSecretKey = 'token'

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.authSecretKey);

    const formattedToken = token ? token.trim() : '';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${formattedToken}`  // Attach the token without extra spaces
    });
  }
  completeProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders(); // Include the headers with the token
    return this.http.put(`${baseUrl}/complete-profile`, profileData, { headers });
  }
  getProfile(): Observable<RhProfileDto> {
    const headers = this.getHeaders();
    return this.http.get<RhProfileDto>(`${baseUrl}/view-profile`, { headers });
  }
  updateProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${baseUrl}/edit-profile`, profileData, { headers });
  }
  getAllJobs(): Observable<JobDto[]> {
    const headers = this.getHeaders();
    return this.http.get<JobDto[]>(`${baseUrl}/jobs/all`, { headers });
  }
  createJob(job: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${baseUrl}/jobs/add`, job, { headers });
  }

  postJob(jobId: number): Observable<JobDto> {
    const headers = this.getHeaders();
    return this.http.put<JobDto>(`${baseUrl}/jobs/post/${jobId}`,jobId, { headers });
  }
  getJobById(jobId: number): Observable<JobDto> {
    const headers = this.getHeaders();
    return this.http.get<JobDto>(`${baseUrl}/jobs/${jobId}`, { headers });
  }







}

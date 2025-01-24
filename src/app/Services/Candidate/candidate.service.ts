import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RhProfileDto} from '../../models/RhPRofileDto';
import {CandidateDto} from '../../models/CandidateDto';

const baseUrl = `${environment.API_URL}/candidate`;
@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private authSecretKey = 'token'

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.authSecretKey);

    const formattedToken = token ? token.trim() :'';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${formattedToken}`  // Attach the token without extra spaces
    });
  }



  firstPage(payload: any): Observable<any> {
    const headers = this.getHeaders(); // Include the headers with the token
    return this.http.put(`${baseUrl}/first-page`, payload, { headers });
  }

  completeProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders(); // Include the headers with the token
    return this.http.put(`${baseUrl}/complete-profile`, profileData, { headers });
  }
  getProfile(): Observable<CandidateDto> {
    const headers = this.getHeaders();
    return this.http.get<CandidateDto>(`${baseUrl}/view-profile`, { headers });
  }
  updateProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${baseUrl}/edit-profile`, profileData, { headers });
  }


}

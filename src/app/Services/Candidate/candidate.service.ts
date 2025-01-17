import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  completeProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders(); // Include the headers with the token
    return this.http.put(`${baseUrl}/complete-profile`, profileData, { headers });
  }


}

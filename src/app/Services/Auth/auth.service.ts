import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import { tap } from 'rxjs/operators';
const baseUrl = `${environment.API_URL}/auth`;
//const baseUrl = `${environment.API_URL}`+'/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private baseUrl = 'http://localhost:8081/api/auth';
  //private baseUrl = `${environment.API_URL}/auth`;

  constructor(private http:HttpClient) { }


  register(userData: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, userData);
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/login`, credentials);
  }

  //Login an existing user
  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${baseUrl}/login`, credentials).pipe(
  //     tap(response => {
  //       if (response && response.token) {
  //         localStorage.setItem('authToken', response.token); // Save token to localStorage
  //       }
  //     })
  //   );
  // }
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Checks if token exists
  }




}

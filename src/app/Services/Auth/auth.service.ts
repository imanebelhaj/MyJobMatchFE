import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';



const baseUrl = `${environment.API_URL}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // private authSecretKey = 'token'
  private isLoggedInStatus = false;
  constructor(private http:HttpClient, private router: Router) { }


  register(userData: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, userData);
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
        this.checkLoginStatus();
        //this.isLoggedInStatus = true;
        console.log('Response from backend:', response); // Debug log
        this.handleNavigation(response.role, response.profileComplete);
      })
    );
  }

  private handleNavigation(role: string, profileComplete: boolean) {
    if (role === 'RH') {
      this.router.navigate(profileComplete ? ['/api/rh/dashboard-rh'] : ['/api/rh/complete-profile']);
    } else if (role === 'CANDIDATE') {
      this.router.navigate(profileComplete ? ['/api/candidate/dashboard-c'] : ['/api/candidate/first-page']);
    } else {
      console.error('Access denied.');
      this.router.navigate(['/access-denied']);
    }
  }

  saveToken(token: string) {
    if (token) {
      console.log('Token saved to localStorage:', token);
      localStorage.setItem('token', token);
       // Token should appear here
    } else {
      console.error('Attempted to save an invalid token');
    }
  }

  // Get the token from local storage
  getToken() {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    console.log('Token retrieved from localStorage:', token);  // Display the token in the console
    return token;
  }



  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const formattedToken = token ? token.trim() : '';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${formattedToken}`
      });
      console.log('💗💗💗');

      this.http.post(`${baseUrl}/logout`,{},{ headers }).subscribe(
        (response: any) => {
          console.log('Logout successful:', response);
          localStorage.removeItem('token');
          this.isLoggedInStatus = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during logout:', error);

        }
      );
    } else {
      console.warn('No token found, redirecting to login');
      this.router.navigate(['/login']);
    }
  }




  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    //console.log('Token found in localStorage',token);
    return !!token ;
    //&& !this.isTokenExpired(token);
  }

  checkLoginStatus(): void {
    const token = this.getToken();
    this.isLoggedInStatus = !!token ;
    //&& !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const expiry = decoded.exp * 1000;  // Convert to milliseconds
      return Date.now() > expiry;
    } catch (error) {
      return true;  // If the token is invalid, consider it expired
    }
  }



}

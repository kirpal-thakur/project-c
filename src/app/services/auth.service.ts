// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api.socceryou.ch/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }



  register(registrationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registrationData);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.setItem('logoutMessage', 'true');
    this.router.navigate(['/']); // Redirect to the login or home page
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, check if a token exists in local storage
    return !!localStorage.getItem('authToken');
  }

   forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // magicLogin(magic_link_url: string): Observable<any> {
  //   console.log('Magic link URL received:', magic_link_url);
  //   // return this.http.get(`${this.apiUrl}/magic-login`);

  //   return this.http.get(`${magic_link_url}`);
  // }

  magicLogin(token: string): Observable<any> {
    const endpointUrl = `${this.apiUrl}/magic-login/${token}`;
    console.log(endpointUrl,"chek the magic token")
    console.log('Token:', token); 
    return this.http.get<any>(endpointUrl);
  }



  showToken(token: string): Observable<any> {
    console.log('Showing token:', token);
    return this.magicLogin(token);
  }

  googleLogin(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/google-signin`, loginData);
  }
  

  getProfileData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { userData: any } }>(
      `${this.apiUrl}/profile`
    );
  }

  getPlacePredictions(input: string) {
    const apiKey = 'AIzaSyDTYy_yjGzg_FN54cp9KiqRH2w60fc0PUs';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`;
    return this.http.get(url);
  }
}

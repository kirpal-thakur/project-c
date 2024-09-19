import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modules/admin/users/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  private apiUrl: string;
  private userToken: string | null;
  private apiUrl2 = 'https://api.socceryou.ch/api/';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.userToken = localStorage.getItem('authToken');
  }

  getProfileData(userId: any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
      `${this.apiUrl}profile`
    );
  }

  getGalleryData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/get-gallery`
    );
  }

  // Fetch teams
  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl2}get-clubs-list`);
  }

  // Method to update user profile
  
  updateUserProfile(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userToken}` // Include authorization token
    });

      return this.http.post(`${this.apiUrl}user/update-profile`, formData, { headers });
  }

  
  getPerformanceData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}player/get-performance-detail`
    );
  }

}

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
  
  getCoverImg(): Observable<any> {    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}` // Include authorization token
  });

    return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
      `${this.apiUrl}user/get-cover-image`
    );
  }

  // Method to update user profile  
  updateUserProfile(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userToken}` // Include authorization token
    });

      return this.http.post(`${this.apiUrl}user/update-profile`, formData, { headers });
  }
  
  // Method to update user profile  
  updateGeneralProfile(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userToken}` // Include authorization token
    });

      return this.http.post(`${this.apiUrl}player/update-general-info`, formData, { headers });
  }
  
  getPerformanceData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}player/get-performance-detail`
    );
  }

  getTransferData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}player/get-transfer-detail`
    );
  }
  
  getCountries(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-countries`
    );
  }
  
  // getFavoritesData(userId:any, params:any): Observable<any> {
  //   return this.http.get<{ status: boolean, message: string, data: { } }>(
  //     `${this.apiUrl}get-favorites`    );
  // }

  getFavoritesData(params: any): Observable<any> {
    // Construct HttpParams object
    let queryParams = new HttpParams()
      .set('offset', params.offset || 0)
      .set('limit', params.limit || 10)
      .set('search', params.search || '');

    return this.http.get<{ status: boolean, message: string, data: {} }>(
      `${this.apiUrl}get-favorites`, { params: queryParams }
    );
  }
  
  getExploresData(params: any): Observable<any> {
    // Construct HttpParams object
    let queryParams = new HttpParams()
      .set('offset', params.offset || 0)
      .set('limit', params.limit || 10)
      .set('search', params.search || '');

    return this.http.get<{ status: boolean, message: string, data: {} }>(
      `${this.apiUrl}users-frontend`, { params: queryParams }
    );
  }
  
  removeFavorites(params: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}delete-favorites`, params, { headers });
  }

  getPurchaseData(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: any }>(
      `${this.apiUrl}user/get-purchase-history`, {
        params: {
          page: pageNumber.toString(),
          // limit: pageSize.toString()
        }
      }
    );
  }
    
  uploadCoverImage(formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}user/upload-cover-image/`, formdata, { headers });
  }

  deleteCoverImage(): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}user/delete-cover-image/`, {headers}
    );
  }
  
  uploadProfileImage(formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}user/upload-profile-image/`, formdata, { headers });
  }

  uploadGalleryImages(formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}user/upload-gallery-image/`, formdata, { headers });
  }

  deleteGalleryImage(params:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}user/delete-gallery-file`, params, { headers });
  }

  updateTransferDetails(transferId: number, transferData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`, // Include authorization token
    });
  
    return this.http.post<any>(
      `${this.apiUrl2}player/edit-transfer-detail/${transferId}`, 
      transferData, 
      { headers }
    );
  }
  
  getPerformanceReports(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    
    return this.http.get<any>(
      `${this.apiUrl2}/player/get-performance-reports`, 
      { headers }
    );
  }
  
    /**
   * Change password for the user.
   * @param newPassword The new password to set.
   * @param confirmPassword The confirmation of the new password.
   * @returns Observable of the API response.
   */
    changePassword(newPassword: string, confirmPassword: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userToken}`,  // Add token to header
      });
  
      const formData = new FormData();
      formData.append('new_password', newPassword);
      formData.append('new_con_password', confirmPassword);
  
      // POST request to the change-password API
      return this.http.post<any>(`${this.apiUrl2}change-password`, formData, { headers });
    }

    
    getPositions(): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userToken}`
      });
      
      return this.http.get<any>(
        `${this.apiUrl2}/get-positions`, 
        { headers }
      );
    }
}

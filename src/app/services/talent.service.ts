import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../modules/admin/users/user.model';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // For storing data after fetching

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  private apiUrl: string;
  private userToken: string | null;
  private apiUrl2 = 'https://api.socceryou.ch/api/';
  public teams: any[] = [];

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

  // Fetch teams and store globally
  getTeams(): Observable<any> {
    if (this.teams.length) {
      // If teams are already fetched, return them as an Observable
      return of(this.teams);
    } else {
      // Fetch teams from the API, store in global variable
      return this.http.get(`${this.apiUrl2}get-teams`).pipe(
        tap((response: any) => {
          if (response && response.status) {
            this.teams = response.data.teams; // Store teams globally
          }
        }),
        catchError(this.handleError<any>('getTeams', [])) // Handle errors gracefully
      );
    }
  }


  // Error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error to console
      return of(result as T); // Return an empty result
    };
  }
  
  // Fetch teams
  getClubs(): Observable<any> {
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
  
  getDomains(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-domains`
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
  
  updatePerformance(performanceId:any, params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/player/edit-performance-detail/${performanceId}`, params, { headers });
  }

  uploadReport(params: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
  
    return this.http.post<any>(`${this.apiUrl2}player/upload-performance-report`, params, {
      headers: headers,
      reportProgress: true,  // This enables progress tracking
      observe: 'events',     // This allows us to observe the full event stream, including upload progress
    });
  }
 

  addPerformance(params: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/player/add-performance-detail`, params, { headers });
  }

  deletePerformance(params: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}player/delete-performance-report`, params, { headers });
  }

  updateTransfer(transferId:any, params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/player/edit-transfer-detail/${transferId}`, params, { headers });
  }

  addTransfer(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/player/add-transfer-detail/`, params, { headers });
  }

  deleteTransfer(id: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');  // Get the token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });
  
    // Pass the headers and params to the DELETE request
    const options = {
      headers: headers
    };
  
    // Make sure you use DELETE, not GET
    return this.http.get<any>(`${this.apiUrl2}player/delete-transfer-detail/${id}`, options);
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

  // Download reports (assuming backend supports this feature)
  downloadReports(reportIds: string[]): Observable<any> {
    let params = new HttpParams();
    reportIds.forEach(id => {
      params = params.append('id[]', id);  // Append each ID to the 'ids[]' query param
    });

    return this.http.get(`${this.apiUrl2}download-reports`, { params, responseType: 'blob' });
  }



}

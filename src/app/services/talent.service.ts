import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../modules/admin/users/user.model';
import { environment } from '../../environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // For storing data after fetching

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  private apiUrl: string;
  private userToken: string | null;
  private apiUrl2 = 'https://api.socceryou.ch/api/';
  public teams: any[] = [];
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.userToken = localStorage.getItem('authToken');
  }

  updatePicOnHeader(pic: string) {
    this.messageSource.next(pic);
  }

  getProfileData(userId: any=1): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
      `${this.apiUrl}profile`,
      {  headers } // Combine params and headers here
    );
  }

  getPlans(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-packages`
    );
  }

  getPackages(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
  
    // Send the HTTP GET request with both params and headers
    return this.http.get<{ status: boolean, message: string, data: {} }>(
      `${this.apiUrl}user/get-packages`,
      {  headers } // Combine params and headers here
    );
  }

  getCards(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/get-payment-methods`
    );
  }

  getUser(user:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/profile/${user}`
    );
  }

  getGalleryData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/get-gallery`
    );
  }

  getHighlightsData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/get-gallery-highlights`
    );
  }

  // Fetch teams and store globally and in localStorage
  getTeams(): Observable<any> {
    const cachedTeams = localStorage.getItem('teams');

    if (cachedTeams) {
      // Parse and return teams from localStorage if available
      this.teams = JSON.parse(cachedTeams);
      return of(this.teams);
    } else if (this.teams.length) {
      // If teams are already fetched globally, return them
      return of(this.teams);
    } else {
      // Fetch teams from the API, store in global variable and localStorage
      return this.http.get(`${this.apiUrl2}get-teams`).pipe(
        tap((response: any) => {
          if (response && response.status) {
            this.teams = response.data.teams; // Store teams globally
            localStorage.setItem('teams', JSON.stringify(this.teams)); // Cache in localStorage
          }
        }),
        catchError(this.handleError<any>('getTeams', [])) // Handle errors gracefully
      );
    }
  }

  getBoosterData(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/get-booster-stats`
    );
  }

  // Fetch teams and store globally and in localStorage
  searchTeams(team:string): Observable<any> {

    // Fetch teams from the API, store in global variable and localStorage
    return this.http.get(`${this.apiUrl2}get-teams?search=${team}`).pipe(
      tap((response: any) => {
        if (response && response.status) {
          this.teams = response.data.teams; // Store teams globally
        }
      }),
      catchError(this.handleError<any>('getTeams', [])) // Handle errors gracefully
    );

  }

  // Error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error to console
      return of(result as T); // Return an empty result
    };
  }

  // Modified function to search clubs based on a search term
  searchClubs(clubName: string): Observable<any> {
    // Prepare the headers (if needed)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}` // Include authorization token
    });

    // Make the GET request to the API with the query parameter
    return this.http.get(`${this.apiUrl2}get-clubs-list?club_name=${clubName}`, { headers });
  }

  // Fetch teams (without any search term)
  getClubs(): Observable<any> {
    return this.http.get(`${this.apiUrl2}get-clubs-list`);
  }

  getClubsForPlayer(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-clubs-list`, {headers}
    );
  }

  getLeagues(): Observable<any> {
    return this.http.get(`${this.apiUrl2}get-leagues`);
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
  
  getViewTransferData(id:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-transfer-detail/${id}`
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

  getUserDomains(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}user/get-active-domains`
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
  
  getAllUses(): Observable<any> {
    // Construct HttpParams object
    return this.http.get<{ status: boolean, message: string, data: {} }>(
      `${this.apiUrl}users-frontend`
    );
  }
  
  
getExploresData(params: any): Observable<any> {
  let queryParams = new HttpParams()
    // Basic pagination parameters
    .set('offset', params.offset || 0)
    .set('limit', params.limit || 10);

  // Add whereClause filters
  if (params.whereClause) {
    Object.keys(params.whereClause).forEach(key => {
      const value = params.whereClause[key];
      if (Array.isArray(value)) {
        // If the value is an array (like for position or age), append each value
        value.forEach(val => {
          queryParams = queryParams.append(`whereClause[${key}][]`, val);
        });
      } else {
        queryParams = queryParams.set(`whereClause[${key}]`, value);
      }
    });
  }

  // Add metaQuery filters
  if (params.metaQuery && Array.isArray(params.metaQuery)) {
    params.metaQuery.forEach((meta: any, index: number) => {
      // Set meta_key and operator directly
      queryParams = queryParams
        .set(`metaQuery[${index}][meta_key]`, meta.meta_key)
        .set(`metaQuery[${index}][operator]`, meta.operator);

      // Handle meta_value separately if it's an array
      if (Array.isArray(meta.meta_value)) {
        meta.meta_value.forEach((value: any, valueIndex: number) => {
          queryParams = queryParams.set(`metaQuery[${index}][meta_value][${valueIndex}]`, value);
        });
      } else {
        queryParams = queryParams.set(`metaQuery[${index}][meta_value]`, meta.meta_value);
      }
    });
  }

  // Add ordering parameters if needed
  if (params.orderBy) {
    queryParams = queryParams
      .set('orderBy', params.orderBy)
      .set('order', params.order || 'desc');
  }

  // Add other query parameters
  if (params.countOnly) {
    queryParams = queryParams.set('countOnly', 'true');
  }
  if (params.noLimit) {
    queryParams = queryParams.set('noLimit', 'true');
  }
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.userToken}`
  });

  // Send the HTTP GET request with both params and headers
  return this.http.get<{ status: boolean, message: string, data: {} }>(
    `${this.apiUrl}users-frontend`, 
    { params: queryParams, headers } // Combine params and headers here
  );
}
  
  removeFavorites(params: any): Observable<any> {
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

  getUserPlans(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: any }>(
      `${this.apiUrl}user/get-active-packages`
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
      `${this.apiUrl2}player/get-performance-reports`, 
      { headers }
    );
  }

  
  updatePerformance(performanceId:any, params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}player/edit-performance-detail/${performanceId}`, params, { headers });
  }

  // Update newsletter subscription
  updateNewsletter(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}user/settings/newsletter`, params, { headers });
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

    return this.http.post<any>(`${this.apiUrl2}player/add-performance-detail`, params, { headers });
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

    return this.http.post<any>(`${this.apiUrl2}player/edit-transfer-detail/${transferId}`, params, { headers });
  }

  addTransfer(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}player/add-transfer-detail/`, params, { headers });
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

  // talent.service.ts
  subscribeToPlan(subscriptionData: { paymentMethodId: string; planId: number; }): Observable<any> {
    return this.http.post('/api/subscribe', subscriptionData); // Adjust the endpoint as needed
  }

  toggleFeaturedFiles(reportIds: any[]): Observable<any> {
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    let params = new HttpParams();
    reportIds.forEach(id => {
      params = params.append('id[]', id);  // Append each ID to the 'ids[]' query param
    });

    return this.http.post(`${this.apiUrl2}user/set-featured-file`, params , {headers});
  }
  

  getPerformanceReportsData(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    
    return this.http.get<any>(
      `${this.apiUrl2}get-performance-reports/${id}`, 
      { headers }
    );
  }

  getPerformanceList(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    
    return this.http.get<any>(
      `${this.apiUrl2}get-performance-detail/${id}`, 
      { headers }
    );
  }

  
  getGalleryFiles(id:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-gallery/${id}`
    );
  }

  
  getHighlightsFiles(id:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}get-gallery-highlights/${id}`
    );
  }

  // Method to track boosted profile views
  trackProfiles(user_id: number, profileId: any[], action: string): Observable<any> {

    let params = new HttpParams();
      params = params.append('user_id', user_id);  
      params = params.append('action',  action);  
      profileId.forEach(id => {
        params = params.append('profile_viewed[]', id);  // Append each ID to the 'ids[]' query param
      });
      
    // Send POST request with payload in body
    return this.http.post<any>(`${this.apiUrl2}user/track-booster-profile`, params);
  }

  // Method to track boosted profile views
  updateBoosterAudience(audienceIds: any[]): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    let params = new HttpParams();
    audienceIds.forEach(id => {
      params = params.append('booster_audience[]', id);  // Append each ID to the 'ids[]' query param
    });

    // Send POST request with payload in body
    return this.http.post(`${this.apiUrl2}user/update-booster-audience`, params , {headers});

  }


  validateCoupon(couponCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    let params = new HttpParams();
      params = params.append('coupon_code', couponCode);  

    return this.http.post(`${this.apiUrl2}user/validate-coupon`, params , {headers});
  }
}

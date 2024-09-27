
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../modules/admin/users/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl;
  private userToken;
  private apiUrl2 = 'https://api.socceryou.ch/api/admin';
  

  constructor(private http: HttpClient) {
    this.apiUrl = environment?.apiUrl;
    this.userToken = localStorage.getItem('authToken');

  }

  // getUsers(pageIndex: number, pageSize: number, filter: string): Observable<{ status: boolean, message: string, data: { userData: User[],totalCount:number } }> {
  getUsers(data: any): Observable<{ status: boolean, message: string, data: { userData: User[],totalCount:number } }> {
    // const params = new HttpParams()
    //   .set('offset',pageIndex)
    //   .set('search',filter)
    //   .set('limit', pageSize)
    //   .set('orderBy', 'id')
    //   .set('order', 'desc');

    let params = new HttpParams();
  
    // Loop through the queryParams object and set each parameter
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }
    // params = params.set("whereClause[membership]", 'free');
    return this.http.get<{ status: boolean, message: string, data: { userData: User[],totalCount:number } }>(
      `${this.apiUrl}admin/users`,
      { params }
    );
  }

  updateUserStatus(userIds: any, newStatus: number): Observable<any> {

    const userToken = localStorage.getItem('authToken');

    // Set headers with token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/update-user-status`, { id: userIds, status: newStatus }, { headers });
  }
  



  // getProfileData(): Observable<any> {
  //   const authToken = localStorage.getItem('authToken'); 

  //   // Example headers with authorization token
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${authToken}`,
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.get<any>(`${this.apiUrl2}/profile/`, { headers });
  // }

  getLocations(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { userData: User[],totalCount:number } }>(
      `${this.apiUrl}get-domains`
    );
  }

  getProfileData(userId:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
      `${this.apiUrl}admin/profile/${userId}`
    );
  }

  getGalleryData(userId:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}admin/get-gallery/${userId}`
    );
  }

  getFavoritesData(userId:any, params:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}admin/get-favorites/${userId}`, { params }
    );
  }

  getPurchaseData(userId:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}admin/get-purchase-history/${userId}`
    );
  }

  getTransferData(userId:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}admin/get-transfer-detail/${userId}`
    );
  }

  deleteUser(userIds: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/delete-user`, { id: userIds }, { headers });
  }

  getPerformanceData(userId:any): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/get-performance-detail/${userId}`
    );
  }

  getAllTeams(): Observable<any> {
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}/get-teams`
    );
  }

  updatePerformance(performanceId:any, params: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/edit-performance-detail/${performanceId}`, params, { headers });
  }

  updateTransfer(transferId:any, params: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/edit-transfer-detail/${transferId}`, params, { headers });
  }

  removeFavorites(params: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/delete-favorites`, params, { headers });
  }

  uploadCoverImage(userId:any, formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/upload-cover-image/${userId}`, formdata, { headers });
  }

  deleteCoverImage(userId:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/delete-cover-image/${userId}`, {headers}
    );
  }

  uploadGalleryImages(userId:any, formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/upload-gallery-image/${userId}`, formdata, { headers });
  }

  deleteGalleryImage(params:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/delete-gallery-file`, params, { headers });
  }

  getScoutHistory(userId:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/get-company-history/${userId}`, {headers}
    );
  }

  getClubHistory(userId:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/get-club-history/${userId}`, {headers}
    );
  }

  updateScoutHistory(userId:any, history:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/add-company-history/${userId}`, {company_history: history}, { headers });
  }

  updateClubHistory(userId:any, history:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/edit-club-history/${userId}`, {club_history: history}, { headers });
  }

  getScoutPlayers(userId:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/get-scout-players/${userId}`, {headers}
    );
  }

  deleteScoutPlayer(id:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/delete-scout-player/${id}`, {headers}
    );
  }  

  getClubTeams(id:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}/get-club-teams/${id}`, {headers}
    );
  } 

  getTeamPlayers(teamId:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/get-club-players/${teamId}`, {headers}
    );
  } 

  getSightings(id:any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl2}/get-sightings/${id}`, {headers}
    );
  }
  
  uploadProfileImage(userId:any, formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/upload-profile-image/${userId}`, formdata, { headers }); 
  }

  getAdminProfile(): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get<{ status: boolean, message: string, data: { } }>(
      `${this.apiUrl}profile`, {headers}
    );
  }

  updateAdminProfile(formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/settings/profile`, formdata, { headers }); 
  }

  updateAdminImage(formdata: any): Observable<any> {
    const userToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.post<any>(`${this.apiUrl2}/settings/upload-profile-image`, formdata, { headers }); 
  }
  
}

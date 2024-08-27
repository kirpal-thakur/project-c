
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

  updateUserStatus(userId: number, newStatus: number): Observable<any> {

    const userToken = localStorage.getItem('authToken');

    // Set headers with token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(`${this.apiUrl2}/update-user-status`, { userId, status: newStatus }, { headers });
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
    // const params = new HttpParams()
    //   .set('offset',pageIndex)
    //   .set('search',filter)
    //   .set('limit', pageSize)
    //   .set('orderBy', 'id')
    //   .set('order', 'desc');

    return this.http.get<{ status: boolean, message: string, data: { userData: User[],totalCount:number } }>(
      `${this.apiUrl}get-domains`
    );
  }

}

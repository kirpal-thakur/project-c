
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../modules/admin/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://api.socceryou.ch/api/users';
  private apiUrl2 = 'https://api.socceryou.ch/api/admin';
  

  constructor(private http: HttpClient) {}

  getUser(){
    // Set headers with token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${'566dc6f9bcc27471f2c7b334789f67a9b4493e336a69066db2e7f88ef7c549b4'}`
    });
    return this.http.get<any>(
      `https://api.socceryou.ch/api/admin/profile/60`,
      { headers }
    );
  }

  getUsers(): Observable<{ status: boolean, message: string, data: { userData: User[] } }> {
    const params = new HttpParams()
      .set('limit', '10')
      .set('offset', '11')
      .set('orderBy', 'first_name')
      .set('order', 'desc');


    return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
      `${this.apiUrl}`,
      { params, }
    );
  }

  updateUserStatus(userId: number, newStatus: number): Observable<any> {

    const userToken = localStorage.getItem('authToken');

    // Set headers with token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
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

}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../modules/admin/users/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private apiUrl = 'https://api.socceryou.ch/api/users';

//   constructor(private http: HttpClient) {}

//   getUsers(): Observable<{ status: boolean, message: string, data: { userData: User[] } }> {
//     const params = new HttpParams()
//       .set('limit', '10')
//       .set('offset', '11')
//       .set('orderBy', 'first_name')
//       .set('order', 'desc');

//     const headers = this.getHeadersWithToken();

//     return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
//       `${this.apiUrl}`,
//       { params, headers }
//     );
//   }

//   private getHeadersWithToken(): HttpHeaders {
//     const token = this.getUserToken();
//     console.log("get token", token)
//     return new HttpHeaders({ Authorization: `Bearer ${token}` });
//   }

//   private getUserToken(): string | null {
//     return localStorage.getItem('authToken');
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../modules/admin/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://api.socceryou.ch/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ status: boolean, message: string, data: { userData: User[] } }> {
    const params = new HttpParams()
      .set('limit', '10')
      .set('offset', '11')
      .set('orderBy', 'first_name')
      .set('order', 'desc');

    const headers = this.getHeadersWithToken();

    return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
      `${this.apiUrl}`,
      { params, headers }
    )
  }

  private getHeadersWithToken(): HttpHeaders {
    const token = this.getUserToken();
    
    console.log("chek the token", token)
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private getUserToken(): string | null {
    return localStorage.getItem('authToken');
  }

}

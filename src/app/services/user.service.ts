// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { User } from '../modules/admin/users/user.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserService {

// //   private apiUrl = 'https://api.socceryou.ch/api/users';

// //   constructor(private http: HttpClient) {}

// //   getUsers(): Observable<{ status: boolean, message: string, data: { userData: User[] } }> {
// //     const params = new HttpParams()
// //       .set('limit', '10')
// //       .set('offset', '11')
// //       .set('orderBy', 'first_name')
// //       .set('order', 'desc');

// //     const headers = this.getHeadersWithToken();

// //     return this.http.get<{ status: boolean, message: string, data: { userData: User[] } }>(
// //       `${this.apiUrl}`,
// //       { params, headers }
// //     );
// //   }

// //   private getHeadersWithToken(): HttpHeaders {
// //     const token = this.getUserToken();
// //     console.log("get token", token)
// //     return new HttpHeaders({ Authorization: `Bearer ${token}` });
// //   }

// //   private getUserToken(): string | null {
// //     return localStorage.getItem('authToken');
// //   }
// // }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
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
//     ).pipe(
//       catchError(this.handleError)
//     );
//   }

//   private getHeadersWithToken(): HttpHeaders {
//     const token = this.getUserToken();
    
//     console.log("chek the token", token)
//     return new HttpHeaders({ Authorization: `Bearer ${token}` });
//   }

//   private getUserToken(): string | null {
//     return localStorage.getItem('authToken');
//   }
// private handleError(error:HttpErrorResponse){
//   let errorMassage ='unknown Error'
//   if(error.error instanceof ErrorEvent){
//     errorMassage = `Error :${error.error.message}`
//   }else {
//     errorMassage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   }
//   console.error(errorMassage);
//   return throwError(errorMassage);
// }

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
  private apiUrl2 = 'https://api.socceryou.ch/api';

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
    ).pipe(
      catchError(this.handleError)
    );
  }

  private getHeadersWithToken(): HttpHeaders {
    const token = this.getUserToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private getUserToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getProfileData(): Observable<any> {
    const authToken = localStorage.getItem('authToken'); 

    // Example headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl2}/profile/`, { headers });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private apiUrl = 'https://api.socceryou.ch/api/';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}get-domains`
    );
  }

  getAllCurrencies(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}get-currencies`
    );
  }
  getAllClubsbyId(id=0): Observable<any> {
    return this.http.get(
      `${this.apiUrl}get-clubs-list?country=${id}`
    );
  }
  getAllClubs(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}get-clubs-list`
    );
  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'your-api-endpoint-url';

  constructor(private http: HttpClient) {}

  getCountriesData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

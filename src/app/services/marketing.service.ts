import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
    private apiUrl;
    constructor(private http: HttpClient) {
        this.apiUrl = environment?.apiUrl;
    
    }
    getPopups(): Observable<{ status: boolean, message: string, data: any }> {
        return this.http.get<{ status: boolean, message: string, data: any }>(
            `${this.apiUrl}admin/get-system-popups`,
          );
    }

    addPopups(record: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}admin/add-system-popup`, record);
    }
    // Method to update an existing record
    updatePopups(id: number, record: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}admin/edit-system-popup/${id}`, record);
    }

    // Method to delete a record by IDs
    deletePopups(ids: any): Observable<any> {
        
        return this.http.post<any>(`${this.apiUrl}admin/delete-system-popup`, ids);
    }
}
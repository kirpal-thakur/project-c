import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
    private apiUrl;
    constructor(private http: HttpClient) {
        this.apiUrl = environment?.apiUrl;
    
    }
    getTemplates(): Observable<{ status: boolean, message: string, data: any }> {
        return this.http.get<{ status: boolean, message: string, data: any }>(
            `${this.apiUrl}admin/get-email-templates`,
          );
    }

    addEmailTemplate(record: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}admin/add-email-template`, record);
    }
    // Method to update an existing record
    updateEmailTemplate(id: number, record: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}admin/edit-email-template/${id}`, record);
    }

    // Method to delete a record by IDs
    deleteEmailTemplate(ids: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}admin/delete-email-template`, ids);
    }
}
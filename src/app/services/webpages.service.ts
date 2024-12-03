import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebPages {
    private apiUrl;

    constructor(private http: HttpClient) {
        this.apiUrl = environment?.apiUrl;
    }

    getAllPages(): Observable<any> {
        return this.http.get<{ status: boolean, message: string, data: {} }>(
            `${this.apiUrl}admin/get-pages`
        );
    }
}
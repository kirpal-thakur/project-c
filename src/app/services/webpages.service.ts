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
    private frontendApiUrl = 'https://api.socceryou.ch/frontend/';

    constructor(private http: HttpClient) {
        this.apiUrl = environment?.apiUrl;
    }

    getAllPages(): Observable<any> {
        return this.http.get<{ status: boolean, message: string, data: {} }>(
            `${this.apiUrl}admin/get-pages`
        );
    }

    deleteWebPages(params: any): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}admin/delete-page`, params);
    }

    getAllLanguage(): Observable<any>{
        return this.http.get<{ status: boolean, message: string, data: {} }>(
            `${this.apiUrl}get-languages`
        );
    }

    addNewPage(params: any): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}admin/add-page`, params);
    }

    getSinglePageDetail(pageId:string):Observable<any>{
        return this.http.get<{ status: boolean, message: string, data: {} }>(
            `${this.apiUrl}admin/get-page/${pageId}`
        );
    }

    getPageBaseOnTheId(langId:string):Observable<any>{
        return this.http.get<{ status: boolean, message: string, data: {} }>(
            `${this.frontendApiUrl}get-frontend-pages?lang_id=${langId}`
        );
    }


    addHomePage(params: any): Observable<any>{
        return this.http.post<any>(`${this.frontendApiUrl}save-homepage`, params);
    }

    addHomePageTabData(params: any): Observable<any>{
        return this.http.post<any>(`${this.frontendApiUrl}save-tabs-homepage`, params);
    }

}
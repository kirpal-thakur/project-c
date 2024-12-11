import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebPages {
    private apiUrl;
    private frontendApiUrl = 'https://api.socceryou.ch/frontend/';

    private languageId = new BehaviorSubject<string>('1'); // Initial value
    languageId$ = this.languageId.asObservable(); // Expose as observable

  updateData(data: string) {
    this.languageId.next(data); // Update the shared data
  }

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

    getDynamicHomePage(langId:any):Observable<any>{
        return this.http.get<{ status: boolean, message: string, data: {} }>(
            `${this.frontendApiUrl}get-homepage-data?&lang_id=${langId}&page_id=1`
        );
    }

    addContactPage(params: any): Observable<any>{
        return this.http.post<any>(`${this.frontendApiUrl}save-contactpage`, params);
    }

    addAboutPage(params: any): Observable<any>{
        return this.http.post<any>(`${this.frontendApiUrl}save-aboutpage`, params);
    }



}
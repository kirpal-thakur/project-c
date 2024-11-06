import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public teams: any[] = [];
  private apiUrl: string;
  private userToken: string | null;
  stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Ensure this is defined in your environment
    this.userToken = localStorage.getItem('authToken');
    this.stripePromise = loadStripe(environment.stripePublishableKey);
  }

  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }

  createCheckoutSession(planId: string,booster_audience:any=''): Observable<any> {    
    const successUrl = window.location.origin + '/success'; // Define your success URL
    const cancelUrl = window.location.origin + '/cancel'; // Define your cancel URL
    // Sending successUrl and cancelUrl as query parameters
    return this.http.get(`${this.apiUrl}create-payment-intent/${planId}?successUrl=${encodeURIComponent(successUrl)}&cancelUrl=${encodeURIComponent(cancelUrl)}&booster_audience=${booster_audience}`);
  }


  cancelSubscription(subscriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/user/cancel-subscription`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    
    const formData = new FormData();
    formData.append('subscription_id', subscriptionId);

    return this.http.post<any>(url, formData, { headers });
  }

  upgradeSubscription(subscriptionId: string, newPackageId: string): Observable<any> {
    const url = `${this.apiUrl}/user/upgrade-subscription`;
    const data = new FormData();
    data.append('subscription_id', subscriptionId);
    data.append('new_package_id', newPackageId);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post<any>(url, data, { headers });
  }
}

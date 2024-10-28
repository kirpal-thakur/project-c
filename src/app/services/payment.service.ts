import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  public teams: any[] = [];
  private apiUrl: string;
  private userToken: string | null;
  stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.userToken = localStorage.getItem('authToken');
    this.stripePromise = loadStripe(environment.stripePublishableKey); // Replace with your Stripe publishable key
  }

  async getStripe() {
    return await this.stripePromise;
  }

  createCheckoutSession(planId: string,id:any=null): Observable<any> {    
    const successUrl = window.location.origin + '/success'; // Define your success URL
    const cancelUrl = window.location.origin + '/cancel'; // Define your cancel URL
    // Sending successUrl and cancelUrl as query parameters
    return this.http.get(`${this.apiUrl}create-payment-intent/${planId}?successUrl=${encodeURIComponent(successUrl)}&cancelUrl=${encodeURIComponent(cancelUrl)}`);
  }
}

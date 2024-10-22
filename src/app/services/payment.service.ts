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

  createCheckoutSession(planId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}create-payment-intent/${planId}`);
  }
}

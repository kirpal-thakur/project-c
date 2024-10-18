import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  public teams: any[] = [];
  stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(environment.stripePublishableKey); // Replace with your Stripe publishable key
  }

  async getStripe() {
    return await this.stripePromise;
  }

  async createPaymentIntent(amount: number): Promise<any> {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_SECRET_KEY`, // Replace with your Stripe secret key
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'amount': amount.toString(),
        'currency': 'usd', // Change to your desired currency
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create PaymentIntent');
    }

    return response.json();
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { TalentService } from '../../../../services/talent.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
})
export class AddCardComponent implements AfterViewInit {
  stripeElements!: StripeElements;
  card!: StripeCardElement;
  email!: string;
  name!: string;

  constructor(private stripeService: TalentService) {}

  async ngAfterViewInit() {
    // Initialize Stripe elements once the component is initialized
    const stripe = await this.stripeService.initializeStripe();
    if (!stripe) return;

    // Create Stripe elements for card input
    this.stripeElements = stripe.elements();
    this.card = this.stripeElements.create('card');
    this.card.mount('#card-element');
  }

  async handleAddCard() {
    console.log('Email:', this.email);
    console.log('Name:', this.name);
    
    // Create the payment method using the Stripe card element
    const paymentMethod = await this.stripeService.createPaymentMethod(this.card);
  
    if (paymentMethod.error) {
      // Handle errors in payment method creation
      console.error(paymentMethod.error.message);
      return;
    }
  
    // Call the backend to create the customer with email, name, and payment method ID
    this.stripeService
      .createCustomer(this.email, this.name, paymentMethod.paymentMethod.id)
      .subscribe(
        (response) => {
          console.log('Customer created successfully:', response);
        },
        (error) => {
          console.error('Error creating customer:', error);
        }
      );
  }
  
}

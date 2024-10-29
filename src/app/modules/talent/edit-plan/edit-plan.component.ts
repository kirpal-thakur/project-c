import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { MessagePopupComponent } from '../../shared/message-popup/message-popup.component';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  countries: any[] = []; // Array to hold country plans
  selectedCountries: any[] = []; // Holds the selected countries
  selectedPlan: any = {}; // Selected country plan details
  stripePromise = loadStripe(environment.stripePublishableKey); // Your Stripe public key
  stripe: any;
  isYearly = false; // Subscription type
  defaultCard: any=null; // Variable to hold the default card

  @Output() buys: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<EditPlanComponent>,
    public talentService: TalentService,
    private stripeService: PaymentService,
    private paymentService:PaymentService
    , public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    // If this.data.plans is an array, assign it directly
    this.countries = Array.isArray(this.data.plans) ? this.data.plans : Object.values(this.data.plans);
    this.selectedPlan =this.data.selectedPlan;
    this.defaultCard = this.data.defaultCard;
    this.selectedCountries = this.data.country;
    this.stripe = await this.stripeService.getStripe();
  }

  async redirectToCheckout(planId: string) {

    try {
      // Call the backend to create the checkout session
      const response = await this.stripeService.createCheckoutSession(planId, this.defaultCard?.id).toPromise();
  
      if (response && response.data.payment_intent.id) {
        // Redirect to Stripe Checkout with the session ID
        const stripe = await this.stripe;
        stripe?.redirectToCheckout({ sessionId: response.data.payment_intent.id });
      } else {
        console.error('Failed to create checkout session', response);
      }
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
    }
  }
  
  onCountrySelect(event: any) {
    const selectedCountryId = event.target.value;
    this.selectedPlan = this.countries.find(country => country.id === selectedCountryId);

    // if (this.selectedCountries.indexOf(this.selectedPlan) === -1) {
    //   this.selectedCountries.push(this.selectedPlan);
    // }
  }

  removeCountry(country: any) {
    this.selectedCountries = this.selectedCountries.filter(c => c.id !== country.id);
  }

  buyNow() {
    if (this.selectedPlan) {
      const planId = this.isYearly ? this.selectedPlan.yearData : this.selectedPlan.monthData; 
      
      // Choose the right price ID based on the selected plan
      this.redirectToCheckout(planId.id);
    } else {
      console.error('No country plan selected');
    }
    // this.dialogRef.close(); // Optionally close the dialog
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
  toggleBillingPlan(isYearly: boolean) {
    this.isYearly = isYearly; // Toggle between monthly and yearly
  }

  cancelPlan(item:any):void{}

  isPlanAlreadySelected(): boolean {
    return this.selectedCountries.some(country => 
      country.package_id === this.selectedPlan?.id && 
      (
        (this.isYearly && country.interval === 'yearly') || 
        (!this.isYearly && country.interval === 'monthly')
      )
    );
  }
   
  
  confirmAndCancelSubscription(subscriptionId: string): void {
    console.log(subscriptionId);
    // return
    const dialogRef = this.dialog.open(MessagePopupComponent, {
      width: '600px',
      data: {
        action: 'delete-confirmation',
        message: 'Are you sure you want to cancel this subscription? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'delete-confirmed') {
        this.cancelSubscription(subscriptionId);
        this.getUserPlans;
      }
    });
  }

  private cancelSubscription(subscriptionId: string): void {
    this.paymentService.cancelSubscription(subscriptionId).subscribe(
      (response: any) => {
        if (response && response.status) {
          // Open the MessagePopupComponent with a success message
          this.dialog.open(MessagePopupComponent, {
            width: '600px',
            data: {
              action: 'display',
              message: 'Subscription canceled successfully.'
            }
          });
          console.log('Subscription canceled successfully:', response);
        } else {
          console.error('Failed to cancel subscription', response);
        }
      },
      error => {
        console.error('Error cancelling subscription:', error);
      }
    );
  }

  
  // Fetch purchases from API with pagination parameters
  getUserPlans(): void {
    this.talentService.getUserPlans().subscribe(
      response => {
        if (response?.status && response?.data) {
          const userPlans = response.data.packages;

          this.selectedCountries = userPlans?.country || ''; // Default to empty string if country is undefined

          console.log('userPlans', userPlans);
        } else {
          console.error('Invalid API response:', response);
        }
      },
      error => {
        console.error('Error fetching user purchases:', error);
      }
    );
  }


}

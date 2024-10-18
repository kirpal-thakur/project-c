import { Component, Inject, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  countries: any[] = []; // Assuming this is fetched from the backend
  selectedCountries: any[] = []; // Dynamically updated
  selectedPlan: any;
  stripePromise = loadStripe(environment.stripePublishableKey); // Your Stripe public key
  stripe:any;
  isYearly=false;
  
  @Output() buys: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<EditPlanComponent>,
    public talentService: TalentService,
    private stripeService:PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    this.countries = { ...this.data.plans };      
    console.log(this.countries) 
    // this.getUserCards();
    this.stripe = await this.stripeService.getStripe();
  }
  
  async redirectToCheckout(planId: string) {
    console.log(planId)
    const stripe = await this.stripe;

    stripe?.redirectToCheckout({
      lineItems: [{ price: planId, quantity: 1 }],  // Ensure 'price' is a valid string
      mode: 'subscription',
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/cancel',
    }).then((result: any) => {
      if (result.error) {
        console.error(result.error.message);
      }
    }).catch((error: any) => {
      console.error('Stripe Checkout Error:', error);
    });
  }

  onCountrySelect(event: any) {
    const selectedCountry = this.countries.find(c => c.id === event.target.value);
    if (selectedCountry && !this.selectedCountries.includes(selectedCountry)) {
      this.selectedCountries.push(selectedCountry);
    }
  }

  removeCountry(country: any) {
    this.selectedCountries = this.selectedCountries.filter(c => c.id !== country.id);
  }

  buyNow() {
    this.dialogRef.close(); // Optionally close the dialog
  }

  cancel(): void {
    this.dialogRef.close();
  }

  
  onPlanSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selected = this.countries.find((plan: any) => plan.id === selectedId);
  
    if (selected) {
      this.selectedPlan = selected;
    }
  }

  
  toggleBillingPlan(plan:any, isYearly: boolean) {
    plan.isYearly = isYearly;
  }

}

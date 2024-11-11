import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { MessagePopupComponent } from '../../shared/message-popup/message-popup.component';
import { UpdateConfirmationPlanComponent } from '../membership/update-confirmation-plan/update-confirmation-plan.component';
import { ActivatedRoute } from '@angular/router';
import { CouponCodeAlertComponent } from '../../shared/coupon-code-alert/coupon-code-alert.component';

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
    private paymentService:PaymentService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    // If this.data.plans is an array, assign it directly
    this.countries = Array.isArray(this.data.plans) ? this.data.plans : Object.values(this.data.plans);
    this.selectedPlan =this.data.selectedPlan;
    this.defaultCard = this.data.defaultCard;
    this.selectedCountries = this.data.country;
    this.stripe = await this.stripeService.getStripe();
    console.log('data',this.data,'countries',this.countries)
  }

  async redirectToCheckout(planId: string,coupon:any='') {

    try {
      // Call the backend to create the checkout session
      const response = await this.stripeService.createCheckoutSession(planId,'',coupon).toPromise();
  
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
  
  // Open coupon dialog
  openCouponDialog(planId:any): void {
    const dialogRef = this.dialog.open(CouponCodeAlertComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let coupon = result;
        this.redirectToCheckout(planId,coupon)
      }
      if (result==null) {
        this.redirectToCheckout(planId);
      }
    });
  }

  buyNow() {
    if (this.isPlanAlreadySelected()) {
      // Show a warning message to the user
      this.dialog.open(MessagePopupComponent, {
        width: '600px',
        data: {
          action: 'display',
          message: 'You already have a subscription for this plan with a different interval. Please cancel it before selecting a new interval.'
        }
      });
      return; // Prevent further action
    }

    let oldPlan = this.selectedCountries.filter(c => c.package_name == this.selectedPlan.name);
    oldPlan = oldPlan.length > 0 ? oldPlan[0] : null;
    console.log(oldPlan)
    
    if (this.selectedPlan) {
      const planId = this.isYearly ? this.selectedPlan.yearData : this.selectedPlan.monthData; 
      const subscribeId = this.isYearly ? this.selectedPlan.monthData : this.selectedPlan.yearData; 

      if(this.isYearly){

        if(this.selectedPlan?.monthData?.is_package_active == 'active'){

          this.updatePlan(planId,this.isYearly,oldPlan);

        }else{
          
          this.openCouponDialog(planId.id)

        }

      }else{

        if(this.selectedPlan?.yearData?.is_package_active == 'active'){

          // Choose the right price ID based on the selected plan
          this.updatePlan(planId,this.isYearly,oldPlan);

        }else{

          this.openCouponDialog(planId.id);

        }
      }
    } else {
      console.error('No country plan selected');
    }
  }

  updatePlan(plan:any, isYearly: boolean, subscribeId: any): void {
    if (plan?.is_package_active == 'active') {
      alert('This plan has already Subscribed.');
      return;
    }

    if (plan.isYearly === isYearly) {
      alert(`You're already subscribed to the ${isYearly ? 'yearly' : 'monthly'} plan.`);
      return;
    }

    const dialogRef = this.dialog.open(UpdateConfirmationPlanComponent, {
      data: { plan, isYearly }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSubscription(subscribeId.id, plan.id);
        console.log(plan);
        console.log(`Plan toggled to ${isYearly ? 'yearly' : 'monthly'}`);
      }
    });
  }

  updateSubscription(old:any,newID:any) {
    
    // Call the backend service to update the subscription
    this.paymentService.upgradeSubscription(old,newID).subscribe(
      response => {
        if (response && response.status) {
          // Open a message popup to inform the user of the successful update
          this.dialog.open(MessagePopupComponent, {
            width: '600px',
            data: {
              action: 'display',
              message: 'Your subscription has been updated successfully.'
            }
          });
        this.dialogRef.close();
          
          console.log('Subscription updated successfully:', response);
        } else {
          console.error('Failed to update subscription', response);
        }
      },
      error => {
        console.error('Error updating subscription:', error);
      }
    );
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
      country.package_name === this.selectedPlan?.name && 
      (
        (this.isYearly && country.interval === 'yearly') || 
        (!this.isYearly && country.interval === 'monthly')
      )
    );
  } 
  
  confirmAndCancelSubscription(subscriptionId: string,canceled=false): void {
    
    if(canceled){
      alert('subscription already cancelled')
      return
    }

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
          this.dialogRef.close();

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

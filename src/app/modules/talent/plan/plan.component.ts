import { Component, OnInit, OnDestroy } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';
import { Subscription } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';
import { PaymentService } from '../../../services/payment.service';
import { UpdateConfirmationPlanComponent } from '../membership/update-confirmation-plan/update-confirmation-plan.component';
import { MessagePopupComponent } from '../../shared/message-popup/message-popup.component';

interface Plan {
  id: number;
  name: string;
  priceMonthly: number | null;
  priceYearly: number | null;
  currency: string;
  isYearly: boolean;
  quantity: number;
  includes: string[];
  yearData: any;
  monthData: any;
  is_package_active:any;
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, OnDestroy {

  plans: Plan[] = [];
  maxQuantity: number = 10;
  premiumPlans: Plan[] = [];
  boostedPlans: Plan[] = [];
  otherPlans: Plan[] = [];
  selectedPlan: Plan | null = null;
  userCards: any[] = [];
  defaultCard: any = null;
  stripe: any;
  loggedInUser: any = localStorage.getItem('userData');
  premium: any = null;
  country: any = '';
  booster: any = null;
  demo: any = null;

  isLoadingPlans: boolean = false;
  isLoadingCheckout: boolean = false;
  isLoadingCards: boolean = false;

  private plansSubscription: Subscription = new Subscription();
  stripePromise = loadStripe(environment.stripePublishableKey);

  constructor(
    private talentService: TalentService, 
    private paymentService: PaymentService, 
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.isLoadingPlans = true;
    this.getUserPlans();
    this.fetchPlans();
    this.getUserCards();
    this.stripe = await this.paymentService.getStripe();
    this.loggedInUser = JSON.parse(this.loggedInUser || '{}');
  }
  
  async redirectToCheckout(planId: string) {
    if (this.premium?.package_id === planId) {
      alert('You already have this plan with the same billing interval.');
      return;
    }
    
    this.isLoadingCheckout = true;
    try {
      const response = await this.paymentService.createCheckoutSession(planId).toPromise();
      
      if (response?.data?.payment_intent?.id) {
        const stripe = await this.stripe;
        stripe?.redirectToCheckout({ sessionId: response.data.payment_intent.id });
      } else {
        console.error('Failed to create checkout session', response);
      }
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
    } finally {
      this.isLoadingCheckout = false;
    }
  }

  ngOnDestroy() {
    this.plansSubscription.unsubscribe();
  }

  fetchPlans() {
    this.plansSubscription = this.talentService.getPackages().subscribe({
      next: (response) => {
        if (response?.status && response?.data?.length) {
          const premiumPlans: Plan[] = [];
          const boostedPlans: Plan[] = [];
          const otherPlans: Plan[] = [];
          
          response.data[0]?.forEach((plan: any) => {
            const newPlanData: Plan = {
              id: plan.id,
              name: plan.package_name,
              priceMonthly: plan.interval === "monthly" || plan.interval === "daily" ? parseFloat(plan.price) : null,
              priceYearly: plan.interval === "yearly" || plan.interval === "weekly"  ? parseFloat(plan.price) : null,
              currency: plan.currency,
              isYearly: plan.interval === "yearly" || plan.interval === "weekly",
              yearData: plan.interval === "yearly" || plan.interval === "weekly" ? plan : null,
              monthData: plan.interval === "monthly" || plan.interval === "daily" ? plan : null,
              quantity: 1,
              includes: this.getIncludes(plan.package_name),
              is_package_active : (plan.is_package_active == 'active' ) ? 'active' : null,
            };

            if (plan.package_name.toLowerCase().includes('premium')) {
              this.mergePlan(premiumPlans, newPlanData);
            } else if (plan.package_name.toLowerCase().includes('booster')) {
              this.mergePlan(boostedPlans, newPlanData);
            } else {
              this.mergePlan(otherPlans, newPlanData);
            }
          });

          this.premiumPlans = premiumPlans;
          this.boostedPlans = boostedPlans;
          this.otherPlans = otherPlans;
          this.selectedPlan = this.otherPlans[0] || null;
        }
      },
      error: (err) => {
        console.error('Failed to fetch plans', err);
      },
      complete: () => {
        this.isLoadingPlans = false;
      }
    });
  }

  mergePlan(planArray: Plan[], newPlanData: Plan) {
    const existingPlanIndex = planArray.findIndex(p => p.name === newPlanData.name);
    if (existingPlanIndex !== -1) {
      const existingPlan = planArray[existingPlanIndex];
      existingPlan.priceMonthly = existingPlan.priceMonthly || newPlanData.priceMonthly;
      existingPlan.priceYearly = existingPlan.priceYearly || newPlanData.priceYearly;
      existingPlan.yearData = existingPlan.yearData || newPlanData.yearData;
      existingPlan.monthData = existingPlan.monthData || newPlanData.monthData;
    } else {
      planArray.push(newPlanData);
    }
  }

  getUserCards(): void {
    this.isLoadingCards = true;
    this.talentService.getCards().subscribe(response => {
      if (response?.status && response?.data?.paymentMethod) {
        this.userCards = response.data.paymentMethod;
        this.defaultCard = this.userCards.find((card: any) => card.is_default === "1") || null;
      } else {
        console.error('Invalid API response:', response);
      }
      this.isLoadingCards = false;
    }, error => {
      console.error('Error fetching user cards:', error);
      this.isLoadingCards = false;
    });
  }

  getIncludes(packageName: string): string[] {
    switch (packageName) {
      case 'Premium': return ["Talent profile data", "Export data", "Chat", "Favorites", "Highlights"];
      case 'Booster': return ["Top search results", "Higher visibility", "Faster network growth", "Boost options"];
      default: return ["Global portfolio visibility", "Higher hiring chances", "Profile for international leagues"];
    }
  }

  handleQuantityChange(event: any, plan: Plan): void {
    const inputValue = Number(event.target.value);
    if (inputValue >= 1 && inputValue <= this.maxQuantity) {
      plan.quantity = inputValue;
    } else if (inputValue > this.maxQuantity) {
      plan.quantity = this.maxQuantity;
    } else {
      plan.quantity = 1;
    }
  }

  async payForPlan(plan: Plan) {
    if (!this.defaultCard) {
      console.error('No default card found for payment');
      return;
    }
  
    try {
      const subscriptionData = {
        paymentMethodId: this.defaultCard.stripe_payment_method_id,
        planId: plan.id,
      };
      const response = await this.talentService.subscribeToPlan(subscriptionData).toPromise();
  
      if (response?.status === 'success') {
        console.log('Subscription successful!', response.subscription);
      } else {
        console.error('Subscription failed:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  }

  getUserPlans(): void {
    this.talentService.getUserPlans().subscribe({
      next: (response) => {
        if (response?.status && response?.data?.packages) {
          const userPlans = response.data.packages;
          this.premium = userPlans?.premium?.[0] || null;
          this.demo = userPlans?.demo?.[0] || null;
          this.booster = userPlans?.booster?.[0] || null;
          this.country = userPlans?.country || '';
          console.log('userPlans', userPlans);
        } else {
          console.error('Invalid API response:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching user plans:', error);
      }
    });
  }


  toggleBillingPlan(plan: Plan, isYearly: boolean, subscribeId: any): void {
    // if (subscribeId?.stripe_cancel_at !== null) {
    //   alert('This plan has already been cancelled and cannot be upgraded.');
    //   return;
    // }
  
    if (plan.isYearly === isYearly) {
      alert(`You're already subscribed to the ${isYearly ? 'yearly' : 'monthly'} plan.`);
      return;
    }
    console.log(subscribeId);
  
    const dialogRef = this.dialog.open(UpdateConfirmationPlanComponent, {
      data: { plan, isYearly }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result ) {
        // const subscribeId = isYearly ? plan.monthData : plan.yearData;
        const planId = isYearly ? plan.yearData : plan.monthData;

        this.updateSubscription(subscribeId.id,planId.id)
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
  
  

  async subscribeToPlan(customerId: string) {
    if (!this.stripe) return;

    try {
      const { error, setupIntent } = await this.stripe.confirmSetup({
        clientSecret: 'setup_intent_client_secret', // Use your SetupIntent client secret from backend
        payment_method: customerId,
      });

      if (error) {
        console.error('Subscription failed:', error.message);
      } else {
        console.log('Subscription successful:', setupIntent);
        // Inform your backend to listen for webhook events regarding this subscription
      }
    } catch (err) {
      console.error('Error subscribing:', err);
    }
  }
    
  decreaseValue(plan: Plan) {
    if (plan.quantity > 1) plan.quantity--;
  }

  increaseValue(plan: Plan) {
    if (plan.quantity < this.maxQuantity) plan.quantity++;
  }

  editPlanPopup(plans:any,country:any) {
    const dialogRef = this.dialog.open(EditPlanComponent, {
      width: '800px',
      data: { 
        plans: plans ,
        selectedPlan :this.selectedPlan,
        defaultCard : this.defaultCard ,
        country : country ,
      }
    });
  }


  onPlanSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selected = this.otherPlans.find((plan: any) => plan.id === selectedId);
  
    if (selected) {
      this.selectedPlan = selected;
    }
  }

}

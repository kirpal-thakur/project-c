import { Component, OnInit, OnDestroy } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';
import { Subscription } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';
import { PaymentService } from '../../../services/payment.service';
import { UpdateConfirmationPlanComponent } from '../membership/update-confirmation-plan/update-confirmation-plan.component';

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
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, OnDestroy {

  plans: Plan[] = [];
  maxQuantity: number = 10;
  premiumPlans: any;
  boostedPlans: any;
  otherPlans: any;
  selectedPlan: any;
  userCards: any;
  defaultCard: any; // Variable to hold the default card
  stripe:any;
  loggedInUser:any = localStorage.getItem('userData');
  premium : any =[];
  country: any=[];
  booster: any=[];
  demo: any=[];
  // Loader flags
  isLoadingPlans: boolean = false;
  isLoadingCheckout: boolean = false;
  isLoadingCards: boolean = false;

  private plansSubscription: Subscription = new Subscription();
  stripePromise = loadStripe(environment.stripePublishableKey); // Your Stripe public key

  constructor(private talentService: TalentService, private stripeService: PaymentService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.isLoadingPlans = true; // Start loading plans
    this.getUserPlans();
    this.fetchPlans();
    this.getUserCards();
    this.stripe = await this.stripeService.getStripe();
    this.loggedInUser = JSON.parse(this.loggedInUser);
  }
  
  async redirectToCheckout(planId: string) {
    
    // Check if the planId already exists in selectedCountries with the same interval
    if(this.premium.length > 0 && this.premium[0].package_id == planId) {
      alert('You have already have this plan with the same billing interval.');
      return; // Stop further execution if the plan is already selected
    }
    
    this.isLoadingCheckout = true; // Start loader for checkout
    try {
      
      const response = await this.stripeService.createCheckoutSession(planId).toPromise();
      
      if (response && response.data.payment_intent.id) {
        const stripe = await this.stripe;
        stripe?.redirectToCheckout({ sessionId: response.data.payment_intent.id });
      } else {
        console.error('Failed to create checkout session', response);
      }
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
    } finally {
      this.isLoadingCheckout = false; // Stop loader for checkout
    }
  }

  async subscribeToPlan(customerId: string, priceId: string) {
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
    
  ngOnDestroy() {
    this.plansSubscription.unsubscribe(); // Clean up subscription
  }

  fetchPlans() {
    this.plansSubscription = this.talentService.getPlans().subscribe({
      next: (response) => {
        if (response.status && response.data.length > 0) {
          const premiumPlans: Plan[] = [];
          const boostedPlans: Plan[] = [];
          const otherPlans: Plan[] = [];
          
          response.data[0].forEach((plan: any) => {
            const newPlanData: Plan = {
              id: plan.id,
              name: plan.package_name,
              priceMonthly: plan.interval === "monthly" || plan.interval === "daily" ? parseFloat(plan.price) : null,
              priceYearly: plan.interval === "yearly" || plan.interval === "weekly"  ? parseFloat(plan.price) : null,
              currency: plan.currency,
              isYearly: plan.interval === "yearly" || plan.interval === "weekly" ,
              yearData: plan.interval === "yearly" || plan.interval === "weekly"  ? (plan) : null,
              monthData: plan.interval === "monthly" || plan.interval === "daily" ? (plan) : null,
              quantity: 1,
              includes: this.getIncludes(plan.package_name),
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
          this.premiumPlans.isYearly = this.premium && this.premium.interval == 'yearly'? true : false;
          this.boostedPlans.isYearly = this.booster && this.booster.interval == 'yearly'? true : false;
          this.selectedPlan = this.otherPlans[0];
        }
      },
      error: (err) => {
        console.error('Failed to fetch plans', err);
      },
      complete: () => {
        this.isLoadingPlans = false; // Stop loader for plans
      }
    });
  }
  
  /**
   * Helper function to merge plan data if the plan already exists.
   */
  mergePlan(planArray: Plan[], newPlanData: Plan) {
    const existingPlanIndex = planArray.findIndex(p => p.name === newPlanData.name);
    if (existingPlanIndex !== -1) {
      // Merge price details if the plan already exists in the array
      const existingPlan = planArray[existingPlanIndex];
      existingPlan.priceMonthly = existingPlan.priceMonthly || newPlanData.priceMonthly;
      existingPlan.priceYearly = existingPlan.priceYearly || newPlanData.priceYearly;
      existingPlan.yearData = existingPlan.yearData || newPlanData.yearData;
      existingPlan.monthData = existingPlan.monthData || newPlanData.monthData;
    } else {
      // Add new plan to the array
      planArray.push(newPlanData);
    }
  }
  

  // Fetch purchases from API with pagination parameters
  getUserCards(): void {
    this.isLoadingCards = true; // Start loading cards
    this.talentService.getCards().subscribe(response => {
      if (response && response.status && response.data) {
        this.userCards = response.data.paymentMethod;
        this.defaultCard = this.userCards.find((card: any) => card.is_default === "1");
        // console.log('Card:', this.defaultCard);
      } else {
        console.error('Invalid API response:', response);
      }
      this.isLoadingCards = false; // Stop loading cards
    }, error => {
      console.error('Error fetching user purchases:', error);
      this.isLoadingCards = false; // Stop loading cards on error
    });
  }

  
  getIncludes(packageName: string): string[] {
    switch (packageName) {
      case 'Premium': return [
        "The complete talent profile with all stages of his career and performance data.",
        "Export data in excel and pdf formats.",
        "Chat with Talents, Clubs and Scouts.",
        "Create your favorite list.",
        "Highlight your best photos and videos on your profile."
      ];
      case 'Booster': return [
        "Jump to the top of search results.",
        "Higher chances to get discovered.",
        "Profile boosts help you grow your network and following faster.",
        "You can boost your profile to reach a specific audience, such as Talents, Clubs or Scouts."
      ];
      default: return [ 
        "Present your profile to clubs and leagues in other countries.",
        "Higher chances to get hired globally.",
        "Build your global portfolio."
      ];
    }
  }

  // toggleBillingPlan(plan: Plan, isYearly: boolean) {
  //   plan.isYearly = isYearly;
  // }

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

  handleQuantityChange(event: any, plan: Plan): void {
    const inputValue = Number(event.target.value);

    // Ensure the quantity is within valid bounds
    if (inputValue >= 1 && inputValue <= this.maxQuantity) {
      plan.quantity = inputValue;
    } else if (inputValue > this.maxQuantity) {
      plan.quantity = this.maxQuantity;
    } else {
      plan.quantity = 1;
    }
  }

  onPlanSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selected = this.otherPlans.find((plan: any) => plan.id === selectedId);
  
    if (selected) {
      this.selectedPlan = selected;
    }
  }

  async payForPlan(plan:any) {

    if (!this.defaultCard) {
      console.error('No default card found for payment');
      return;
    }
  
    try {
      // Prepare the subscription data
      const subscriptionData = {
        paymentMethodId: this.defaultCard.stripe_payment_method_id,
        planId: plan.id,
      };
  
      // Call the backend to create a subscription
      const response = await this.talentService.subscribeToPlan(subscriptionData).toPromise();
  
      if (response.status === 'success') {
        console.log('Subscription successful!', response.subscription);
        // Handle successful subscription, e.g., update the UI or notify the user
      } else {
        console.error('Subscription failed:', response.message);
      }
    } catch (error) {
      console.error('Error during subscription:', error);
    }
    
  }

  // Fetch purchases from API with pagination parameters
  getUserPlans(): void {
    this.talentService.getUserPlans().subscribe(
      response => {
        if (response?.status && response?.data) {
          const userPlans = response.data.packages;

          // Use optional chaining and nullish coalescing to handle undefined/null
          this.premium = Array.isArray(userPlans?.premium) && userPlans.premium.length > 0 ? userPlans.premium : [];
          this.demo = Array.isArray(userPlans?.demo) && userPlans.demo.length > 0 ? userPlans.demo : [];
          this.booster = Array.isArray(userPlans?.booster) && userPlans.booster.length > 0 ? userPlans.booster : [];

          // Assign the last index of premium and booster arrays
          this.premium = this.premium.length > 0 ? this.premium[0] : null;
          this.booster = this.booster.length > 0 ? this.booster[0] : null;
          this.demo = this.demo.length > 0 ? this.demo[0] : null;

          this.country = userPlans?.country || ''; // Default to empty string if country is undefined

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


  toggleBillingPlan(plan: Plan, isYearly: boolean, subscribeId: any): void {

    if (subscribeId.stripe_cancel_at !== null) {
        alert('This plan has already been cancelled and cannot be upgraded.');
        return;
    }
  
    if (plan.isYearly === isYearly ) {
      return; // No change needed
    }
  
    const dialogRef = this.dialog.open(UpdateConfirmationPlanComponent, {
      width: '600px', // Make dialog slightly wider for readability
      data: {
        message: `Are you sure you want to switch to ${isYearly ? 'Yearly' : 'Monthly'} billing for the ${plan.name} plan?`
      },
      disableClose: true // Force the user to make a choice
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const newPackageId = isYearly ? plan.yearData.id : plan.monthData.id;
        this.stripeService.upgradeSubscription(subscribeId.id, newPackageId)
          .subscribe({
            next: (response) => {
              if (response?.status) {
                plan.isYearly = isYearly; // Update the plan status
                alert('Your plan has been updated successfully.');
              } else {
                console.error('Subscription update failed:', response.message);
                alert('Failed to update your subscription. Please try again.');
              }
            },
            error: (error) => {
              console.error('Error during subscription update:', error);
              alert('An error occurred. Please try again later.');
            }
          });
      }
    });
  }
}

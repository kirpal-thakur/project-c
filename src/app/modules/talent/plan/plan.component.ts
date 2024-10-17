import { Component, OnInit, OnDestroy } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';
import { Subscription } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';

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
  

  private plansSubscription: Subscription = new Subscription();
  stripePromise = loadStripe('pk_test_51PVE08Ru80loAFQXg7MVGXFZuriJbluM9kOaTzZ0GteRhI0FIlkzkL2TSVDQ9QEIp1bZcVBzmzWne3fGkCITAy7X00gGODbR8a'); // Your Stripe public key

  constructor(private talentService: TalentService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.fetchPlans();
    // this.getUserCards();
    this.stripe = await this.talentService.getStripe();
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
              priceMonthly: plan.interval === "monthly" ? parseFloat(plan.price) : null,
              priceYearly: plan.interval === "yearly" ? parseFloat(plan.price) : null,
              currency: plan.currency,
              isYearly: plan.interval === "yearly",
              yearData: plan.interval === "yearly" ? (plan) : null,
              monthData: plan.interval === "monthly" ? (plan) : null,
              quantity: 1,
              includes: this.getIncludes(plan.package_name),
            };

            // Categorize plans into premium, boosted, and others
            if (plan.package_name.toLowerCase().includes('premium')) {
              this.mergePlan(premiumPlans, newPlanData);
            } else if (plan.package_name.toLowerCase().includes('booster')) {
              this.mergePlan(boostedPlans, newPlanData);
            } else {
              this.mergePlan(otherPlans, newPlanData);
            }
          });

          // Assign the categorized plans to their respective variables
          this.premiumPlans = premiumPlans;
          this.boostedPlans = boostedPlans;
          this.otherPlans = otherPlans;
          this.selectedPlan = this.otherPlans[0];

          // Log the categorized plans for debugging
          console.log('Premium Plans:', this.premiumPlans);
          console.log('Boosted Plans:', this.boostedPlans);
          console.log('Other Plans:', this.otherPlans);
        }
      },
      error: (err) => {
        console.error('Failed to fetch plans', err); // Add error handling
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
    this.talentService.getCards().subscribe(response => {
      if (response && response.status && response.data) {
        this.userCards = response.data.paymentMethod;
        console.log(this.userCards);

        // Identify the default card
        this.defaultCard = this.userCards.find((card: any) => card.is_default === "1");
        console.log('Default Card:', this.defaultCard); // Log the default card
      } else {
        console.error('Invalid API response:', response);
      }
    }, error => {
      console.error('Error fetching user purchases:', error);
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

  toggleBillingPlan(plan: Plan, isYearly: boolean) {
    plan.isYearly = isYearly;
  }

  decreaseValue(plan: Plan) {
    if (plan.quantity > 1) plan.quantity--;
  }

  increaseValue(plan: Plan) {
    if (plan.quantity < this.maxQuantity) plan.quantity++;
  }

  editPlanPopup(id: number) {
    const dialogRef = this.dialog.open(EditPlanComponent, {
      width: '800px',
      data: { planId: id }
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

  
  async subscribeToPlan(plan: any) {
    if (!this.stripe) return;

    try {
      const { error, setupIntent } = await this.stripe.confirmSetup({
        clientSecret: 'sk_test_51PVE08Ru80loAFQX8xPJUrsLF8NVU0r2l5UXZD6XelM7JKK63aUPvjDtIwqa7aEHFPb66cs6yhgQNDVI7sxInMMT00T2UDPvky', // Use your SetupIntent client secret from backend
        payment_method: this.defaultCard.stripe_payment_method_id,
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
}

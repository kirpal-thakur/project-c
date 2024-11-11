import { Component, Inject, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../../services/talent.service';
import { PaymentService } from '../../../../services/payment.service';
import { CouponCodeAlertComponent } from '../../../shared/coupon-code-alert/coupon-code-alert.component';

@Component({
  selector: 'add-booster',
  templateUrl: './add-booster.component.html',
  styleUrls: ['./add-booster.component.scss']
})
export class AddBoosterComponent {
  isLoadingCheckout: boolean = false;
  stripe: any;
  @Input() audiences = [
    { role: "Clubs", id: 2 },
    { role: "Scouts", id: 3 },
    { role: "Talents", id: 4 },
  ];     // List of all audiences
  selectedAudienceIds: number[] = []; // Store only audience IDs
  id: any;
  loggedInUser: any = localStorage.getItem('userInfo');

  constructor(
    public dialogRef: MatDialogRef<AddBoosterComponent>,
    public talentService: TalentService,
    private stripeService: PaymentService,
    private paymentService: PaymentService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.id = this.data.id || [];
    this.stripe = await this.paymentService.getStripe();
  }

  // Apply the selected audiences filter
  applyFilter() {
    console.log("Selected Audiences:", this.selectedAudienceIds);
  }

  pauseBoost() {
    this.dialogRef.close();
  }

  // Handle checkbox selection and store only the IDs
  toggleAudienceSelection(audienceId: number, event: any) {
    if (event.target.checked) {
      // Add the ID if checked
      this.selectedAudienceIds.push(audienceId);
    } else {
      // Remove the ID if unchecked
      this.selectedAudienceIds = this.selectedAudienceIds.filter(id => id !== audienceId);
    }
  }

  // Get selected audience roles by matching the selected IDs
  getSelectedAudienceRoles() {
    return this.audiences.filter(audience => this.selectedAudienceIds.includes(audience.id));
  }

  saveBoost() {
    this.openCouponDialog()
  }

  // Open coupon dialog
  openCouponDialog(): void {
    const dialogRef = this.dialog.open(CouponCodeAlertComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let coupon = result;
        this.redirectToCheckout(this.id, this.selectedAudienceIds, coupon);
      }
      if (result==null) {
        this.redirectToCheckout(this.id,this.selectedAudienceIds);
      }
    });
  }
  
  async redirectToCheckout(planId: string, booster_audience: number[] = [],coupon:any='') {
    this.isLoadingCheckout = true;
    try {
      const response = await this.paymentService.createCheckoutSession(planId, booster_audience.join(','),coupon).toPromise();
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

  calculateAge(dob: string | Date): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }
}

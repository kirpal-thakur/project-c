import { MatDialogRef } from '@angular/material/dialog';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CouponService } from '../../../services/coupon.service'; 
import { TalentService } from '../../../services/talent.service'; 

@Component({
  selector: 'app-coupon-code-alert',
  templateUrl: './coupon-code-alert.component.html',
  styleUrls: ['./coupon-code-alert.component.scss']
})
export class CouponCodeAlertComponent implements OnInit {

  couponCode: string = '';
  couponError: string = '';
  couponSuccess: string = '';
  couponApplied: boolean = false; // To track if coupon was successfully applied
  private couponInputSubject = new Subject<string>(); // Subject to debounce user input

  constructor(
    public dialogRef: MatDialogRef<CouponCodeAlertComponent>,
    private talentService: TalentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Listen to the debounced input (not used for validation anymore)
    this.couponInputSubject.pipe(
      debounceTime(500) // 500ms delay for API call after typing stops
    ).subscribe((code) => {
      // Validate coupon if needed
      // this.validateCoupon(code);
    });
  }

  // Called on every input change, emits the input value to debounce
  onCouponInput(): void {
    this.couponError = ''; // Clear previous errors
    this.couponSuccess = ''; // Clear previous success message
  }

  // Validate coupon by calling the API on Apply button click
  applyCoupon(): void {
    // If the couponCode is valid, validate it
    if (!this.couponCode.trim()) {
      this.couponError = 'Please enter a coupon code.';
      return;
    }

    // Call API to validate coupon
    this.talentService.validateCoupon(this.couponCode).subscribe(
      (response) => {
        if (response.status) {
          this.couponSuccess = 'Coupon code applied successfully!';
          this.couponError = ''; // Clear error if valid
          this.couponApplied = true; // Mark coupon as applied
        } else {
          this.couponError = 'Invalid Coupon Code. Please try again.';
          this.couponSuccess = ''; // Clear success message if invalid
          this.couponApplied = false;
        }
      },
      (error) => {
        // Specific error handling
        if (error.status === 0) {
          this.couponError = 'Network error. Please check your connection.';
        } else {
          this.couponError = 'An error occurred. Please try again later.';
        }
        this.couponSuccess = ''; // Clear success message on error
        console.error('Coupon validation error:', error);
        this.couponApplied = false; // In case of error, set coupon as not applied
      }
    );
  }

  // Proceed to checkout without coupon or after applying it
  proceedToCheckout(): void {
    this.dialogRef.close(this.couponCode); // Close the dialog with the coupon code (if applied) or null
  }

  // Close dialog without a coupon
  noCoupon(): void {
    this.dialogRef.close(null); // Close without coupon
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close(false);
  }
}

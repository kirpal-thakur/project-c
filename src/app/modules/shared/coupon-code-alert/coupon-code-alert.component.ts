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
  private couponInputSubject = new Subject<string>(); // Subject to debounce user input

  constructor(
    public dialogRef: MatDialogRef<CouponCodeAlertComponent>,
    private talentService: TalentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Listen to the debounced input
    this.couponInputSubject.pipe(
      debounceTime(500) // 500ms delay for API call after typing stops
    ).subscribe((code) => {
      this.validateCoupon(code); // Validate coupon only after debounce
    });
  }

  // Called on every input change, emits the input value to debounce
  onCouponInput(): void {
    this.couponError = ''; // Clear previous errors
    this.couponSuccess = ''; // Clear previous success message
    this.couponInputSubject.next(this.couponCode.trim()); // Emit current value
  }

  // Validate coupon by calling the API
  private validateCoupon(code: string): void {
    // No need to validate empty codes
    if (!code) {
      this.couponError = '';
      this.couponSuccess = '';
      return;
    }

    // Call API to validate coupon
    this.talentService.validateCoupon(code).subscribe(
      (response) => {
        if (response.status) {
          this.couponSuccess = 'Coupon code applied successfully!';
          this.couponError = ''; // Clear error if valid
        } else {
          this.couponError = 'Invalid Coupon Code. Please try again.';
          this.couponSuccess = ''; // Clear success message if invalid
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
      }
    );
  }

  // Apply coupon after validating
  applyCoupon(): void {
    if (!this.couponError && this.couponCode.trim()) {
      this.dialogRef.close(this.couponCode); // Close with valid coupon code
    } else {
      this.couponError = 'Please enter a valid coupon code.';
    }
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

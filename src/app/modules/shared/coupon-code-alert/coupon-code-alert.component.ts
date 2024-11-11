import { MatDialogRef } from '@angular/material/dialog';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-code-alert',
  templateUrl: './coupon-code-alert.component.html',
  styleUrls: ['./coupon-code-alert.component.scss']
})
export class CouponCodeAlertComponent implements OnInit {

  hidePlaceholder: boolean = false;
  couponCode: string = '';
  couponError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CouponCodeAlertComponent>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Simulate a change in 'hidePlaceholder' after initialization
    setTimeout(() => {
      this.hidePlaceholder = true;  // Change the value after the component is initialized
      this.cdr.detectChanges();     // Manually trigger change detection
    }, 1000);
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Apply coupon and check validity (could call an API or service here)
  applyCoupon(): void {
    if (this.couponCode.trim() === '') {
      this.couponError = true;
      return;
    }

    // Here you can call an API or service to verify the coupon code
    // If it's valid, you proceed; if not, you can show an error message
    // For now, let's assume the coupon code is valid
    this.dialogRef.close(this.couponCode);
  }

  // Handle case where user doesn't have a coupon
  noCoupon(): void {
    this.dialogRef.close(null); // Close the dialog without a coupon code
  }
}

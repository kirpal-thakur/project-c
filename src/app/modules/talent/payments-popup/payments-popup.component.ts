import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payments-popup',
  templateUrl: './payments-popup.component.html',
  styleUrls: ['./payments-popup.component.scss'] // Fixed this to be 'styleUrls'
})
export class PaymentsPopupComponent implements OnInit {

  plans: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PaymentsPopupComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.plans = this.data.cards; // Initialize the plans array with the data passed into the dialog
    console.log(this.plans);
  }

  setPrimary(payment: any) {
    // Logic to set the payment as primary
    this.plans.forEach(p => p.isPrimary = false); // Reset all to non-primary
    payment.isPrimary = true; // Set the selected one as primary
  }

  removePayment(payment: any) {
    // Logic to remove the payment
    this.plans = this.plans.filter(p => p !== payment);
  }

  updatePayment(payment: any) {
    // Logic to update the payment details
    console.log('Updating payment: ', payment);
  }

  addNewPaymentMethod() {
    // Logic to add a new payment method
    console.log('Adding new payment method');
  }

  closeDialog(): void {
    this.dialogRef.close();  // Closes the dialog
  }

  togglePrimary(payment:any){

  }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-transfer-details',
  templateUrl: './edit-transfer-details.component.html',
  styleUrls: ['./edit-transfer-details.component.scss']
})
export class EditTransferDetailsComponent {
  teams: any[] = [];  // Assume you get this data from a service
  
  constructor(
    public dialogRef: MatDialogRef<EditTransferDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    this.dialogRef.close(this.data); // Pass updated data to parent component
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}

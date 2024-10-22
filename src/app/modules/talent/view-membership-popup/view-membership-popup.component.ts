import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-membership-popup',
  templateUrl: './view-membership-popup.component.html',
  styleUrl: './view-membership-popup.component.scss'
})
export class ViewMembershipPopupComponent {
  
  plan:any;
  constructor(public dialogRef : MatDialogRef<ViewMembershipPopupComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.plan = { ...this.data };
    console.log(this.plan)
  }

  onCancel(): void {
    console.log("Popup closed");
    this.dialogRef.close();  
  }
}

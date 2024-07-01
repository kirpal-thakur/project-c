// import { Component, Inject } from '@angular/core';
// import {
//   MatDialogRef,
//   MAT_DIALOG_DATA
// } from '@angular/material/dialog';

// @Component({
//   selector: 'app-marketing-popup',
//   templateUrl: './marketing-popup.component.html',
//   styleUrl: './marketing-popup.component.scss'
// })
// export class MarketingPopupComponent {
//   constructor(
//   // readonly dialogRef = inject(MatDialogRef<MarketingPopupComponent>)
//   readonly dialogRef: MatDialogRef<MarketingPopupComponent>, 
//   @Inject(MAT_DIALOG_DATA) public data: any) {}
//   // onNoClick(): void {
//   //   this.dialogRef.close();
//   // }

//   close() {
//     console.log('Close button clicked');
//     this.dialogRef.close();
//   }


// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-marketing-popup',
  templateUrl: './marketing-popup.component.html',
  styleUrls: ['./marketing-popup.component.scss']
})
export class MarketingPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<MarketingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    console.log('Close button clicked');
    this.dialogRef.close();
  }

  onClickOutside() {
    console.log('Clicked outside the dialog');
    this.dialogRef.close();
  }
}

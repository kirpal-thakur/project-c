import { Component, inject } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { MarketingPopupComponent } from './marketing-popup/marketing-popup.component'; 

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent {
  readonly dialog = inject(MatDialog);

  editMarkiting(){
    console.log('Edit user button clicked!');
    const dialogRef = this.dialog.open(MarketingPopupComponent,
     { 
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      disableClose: false 
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle the result if needed
  });
  
  }
}

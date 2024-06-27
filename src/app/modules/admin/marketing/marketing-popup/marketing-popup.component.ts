import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-marketing-popup',
  templateUrl: './marketing-popup.component.html',
  styleUrl: './marketing-popup.component.scss'
})
export class MarketingPopupComponent {
  readonly dialogRef = inject(MatDialogRef<MarketingPopupComponent>);

  close(){
    console.log('Close button clicked');
    this.dialogRef.close();
  }
}

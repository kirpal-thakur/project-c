import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-templates',
  templateUrl: './template-popup.component.html',
  styleUrl: './template-popup.component.scss'
})
export class MarketingPopupComponent {
  readonly dialogRef = inject(MatDialogRef<MarketingPopupComponent>);

  close(){
    console.log('Close button clicked');
    this.dialogRef.close();
  }
}

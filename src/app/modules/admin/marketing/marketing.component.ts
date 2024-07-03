import { Component, inject } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { MarketingPopupComponent } from './marketing-popup/marketing-popup.component'; 
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';

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
      height: '528px',
      width: '500px',
  });
  
  }
  
  editfilter(){
    this.dialog.open(FilterPopupComponrnt,{
      height: '450px',
      width: '300px',
      position: {
        right: '30px',
        top:'150px'
      }
    })
  }
}

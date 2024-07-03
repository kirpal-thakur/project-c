import { Component, inject } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { MarketingPopupComponent } from './template-popup/template-popup.component'; 
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  readonly dialog = inject(MatDialog);

  editTemplate(){
    console.log('Edit user button clicked!');
    const dialogRef = this.dialog.open(MarketingPopupComponent,{
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

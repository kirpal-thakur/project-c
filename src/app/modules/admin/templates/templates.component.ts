import { Component, inject } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { MarketingPopupComponent } from './template-popup/template-popup.component'; 

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  readonly dialog = inject(MatDialog);

  editTemplate(){
    console.log('Edit user button clicked!');
    const dialogRef = this.dialog.open(MarketingPopupComponent);
  }
}

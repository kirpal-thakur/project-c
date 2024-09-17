import { Component, inject } from '@angular/core';
import { CoupenCodePopupComponent } from './coupen/coupenCode-popup.component';
import {  MatDialog } from '@angular/material/dialog';
import { AdvertisingPopupComponent } from './advertising/advertising-popup.component';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss'
})
export class WebsiteComponent {
  constructor(private dialog: MatDialog) {}

  editCoupenCode(){
    const dialogRef = this.dialog.open(CoupenCodePopupComponent,{
      height: '598px',
      width: '600px',
      panelClass: 'cutam-cupen'
   
    
    });


  }
  editAdvertising(){
    const dialogRef = this.dialog.open(AdvertisingPopupComponent,{
      height: '500px',
      width: '600px',
      panelClass: 'cutam-cupen'
      // position: {
      //   top:'75px',
      //   left:'340px'
      // }
    
    });
  }


  



}

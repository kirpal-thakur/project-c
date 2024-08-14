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
      height: '528px',
      width: '550px',
      position: {
        top:'85px',
        left:'340px'
      }
    
    });


  }
  editAdvertising(){
    const dialogRef = this.dialog.open(AdvertisingPopupComponent,{
      height: '580px',
      width: '550px',
      position: {
        top:'75px',
        left:'340px'
      }
    
    });
  }
}

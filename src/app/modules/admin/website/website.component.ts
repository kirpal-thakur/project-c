import { Component, inject } from '@angular/core';
import { CoupenCodePopupComponent } from './coupen/coupenCode-popup.component';
import {  MatDialog } from '@angular/material/dialog';
import { AdvertisingPopupComponent } from './advertising1/advertising-popup.component';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss'
})
export class WebsiteComponent {

  tab:any = "webpages";

  constructor(private dialog: MatDialog) {}

  switchTab(tab:any){
    this.tab = tab;
  }

  
  


  



}

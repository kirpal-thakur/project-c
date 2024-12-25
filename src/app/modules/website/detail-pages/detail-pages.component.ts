import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-pages',
  templateUrl: './detail-pages.component.html',
  styleUrl: './detail-pages.component.scss'
})
export class DetailPagesComponent {
  adVisible: boolean[] = [true, true, true,true, true, true]; // Array to manage ad visibility

  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true,true, true, true];
  }

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
  adVisible: boolean[] = [true, true, true]; // Array to manage ad visibility

  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true];
  }

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

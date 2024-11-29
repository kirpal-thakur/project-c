import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrl: './cookie.component.scss'
})
export class CookieComponent implements OnInit {
  adVisible: boolean[] = [true, true, true]; // Array to manage ad visibility

  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true];
  }

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }
}

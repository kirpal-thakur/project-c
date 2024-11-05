import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent implements OnInit {

  adVisible: boolean[] = [true, true, true]; // Array to manage ad visibility

  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true];
  }

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

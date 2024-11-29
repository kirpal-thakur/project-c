import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // ngOnInit() {
  //   this.adVisible = [true, true, true, true, true, true, true];
  // }
  // adVisible: boolean[] = [true, true, true, true, true, true, true]; // Array to manage ad visibility

  // closeAd(index: number) {
  //   this.adVisible[index] = false; // Set the specific ad to not visible based on index
  // }

  adVisible = [true, true, true, true, true, true, true]; // Array to control ad visibility
  countries = [
    'Switzerland', 'Germany', 'France', 'Italy', 'Portugal',
    'England', 'Spain', 'Belgium', 'Sweden', 'Denmark'
  ];

  closeAd(index: number) {
    this.adVisible[index] = false;
  }

  openModal(modalId: string) {
    // Implement modal opening logic here
  }

}

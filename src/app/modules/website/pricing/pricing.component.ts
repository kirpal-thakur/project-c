import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  isActive1 = true; // Premium Plan
  isActive2 = true; // Multi-Country Plan
  isActive3 = true; // Multi-Country Plan
   
     ngOnInit() {
       // Retrieve the states from local storage
       const savedState1 = localStorage.getItem('toggleState1');
       const savedState2 = localStorage.getItem('toggleState2');
       const savedState3 = localStorage.getItem('toggleState3');
   
       // Set isActive for each toggle based on the saved states or default to false
       this.isActive1 = savedState1 === 'true' ? true : false;
       this.isActive2 = savedState2 === 'true' ? true : false;
       this.isActive3 = savedState3 === 'true' ? true : false;
        this.adVisible = [true, true, true, true, true, true, true];
     }
   
     toggle1() {
       this.isActive1 = !this.isActive1;
       // Save the new state to local storage
       localStorage.setItem('toggleState1', this.isActive1.toString());
     }
   
     toggle2() {
       this.isActive2 = !this.isActive2;
       // Save the new state to local storage
       localStorage.setItem('toggleState2', this.isActive2.toString());
     }
     toggle3() {
      this.isActive3 = !this.isActive3;
      // Save the new state to local storage
      localStorage.setItem('toggleState3', this.isActive3.toString());
    }
    adVisible: boolean[] = [true, true, true, true, true, true, true]; // Array to manage ad visibility
  
    closeAd(index: number) {
      this.adVisible[index] = false; // Set the specific ad to not visible based on index
    }


}

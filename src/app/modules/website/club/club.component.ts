import { Component } from '@angular/core';


@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {
  isActive1 = true; // Premium Plan
  isActive2 = true; // Multi-Country Plan
  isActive3 = true; // Multi-Country Plan

  activeAccordionIndex = 1;

  setActiveAccordion(index: number): void {
    this.activeAccordionIndex = index;
  }
   
     ngOnInit() {
       // Retrieve the states from local storage
       const savedState1 = localStorage.getItem('toggleState1');
       const savedState2 = localStorage.getItem('toggleState2');
       this.adVisible = [true, true, true, true, true, true, true];
   
       // Set isActive for each toggle based on the saved states or default to false
       this.isActive1 = savedState1 === 'true' ? true : false;
       this.isActive2 = savedState2 === 'true' ? true : false;
       this.isActive3 = savedState2 === 'true' ? true : false;
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
      localStorage.setItem('toggleState2', this.isActive3.toString());
    }
     
     premiumFeatures = [
       'The complete talent profile with all stages of his career and performance data.',
       'Export data in excel and pdf formats.',
       'Create your favorite list.',
       'Highlight your best photos and videos on your profile.'
     ];
   
     multiCountryFeatures = [
       'Present your profile to clubs and leagues in other countries.',
       'Higher chances to get hired globally.',
       'Build your global portfolio.'
     ];

     boosterFeatures = [
      'Present your profile to clubs and leagues in other countries.',
      'Higher chances to get hired globally.',
      'Build your global portfolio.'
    ];

    adVisible: boolean[] = [true, true, true, true, true, true, true]; // Array to manage ad visibility

    closeAd(index: number) {
      this.adVisible[index] = false; // Set the specific ad to not visible based on index
    }

}

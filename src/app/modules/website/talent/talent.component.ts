import { Component } from '@angular/core';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss'
})
export class TalentComponent {
     // Define the toggle states
     isActive1: boolean = false;
     isActive2: boolean = false;
   
     ngOnInit() {
       // Retrieve the states from local storage
       const savedState1 = localStorage.getItem('toggleState1');
       const savedState2 = localStorage.getItem('toggleState2');
   
       // Set isActive for each toggle based on the saved states or default to false
       this.isActive1 = savedState1 === 'true' ? true : false;
       this.isActive2 = savedState2 === 'true' ? true : false;
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

}

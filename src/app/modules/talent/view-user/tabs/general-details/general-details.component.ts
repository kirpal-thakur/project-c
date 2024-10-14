import { Component, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'view-user-general-details',
  templateUrl: './general-details.component.html',
  styleUrl: './general-details.component.scss'
})
export class GeneralDetailsComponent {
  user:any = {}
  userNationalities:any = [];
  positions:any = [];
  position:any;

  @Input() userData: any;
  
  constructor( public dialog: MatDialog) { 
    // If you want to load the user data from localStorage during initialization    
  }

  ngOnInit(): void {
    this.user = this.userData;
    setTimeout(() => {
      console.log('profile tab', this.user);
    }, 1000);    
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData']) {
      // Update the user object with the latest userData
      this.user = changes['userData'].currentValue;
  
      // Check if user_nationalities exist and parse it
      if (this.user && this.user.user_nationalities) {
        this.userNationalities = JSON.parse(this.user.user_nationalities);
      }
    }
  }
  

  calculateAge(dob: string | Date): number {
    // Convert the input date to a Date object if it's a string
    const birthDate = new Date(dob);
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the current date is before the birthday
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

    // Function to get the main position from the array
  getMainPosition() {
    this.positions = JSON.parse(this.userData.positions);
    const mainPosition = this.positions.find((pos : any) => pos.main_position === 1);
     this.position ? mainPosition.position_name : null;
  }
  
  // Function to get other positions from the array
  getOtherPositions() {
    const otherPositions = this.positions
      .filter((pos : any) => pos.main_position === null)
      .map((pos : any) => pos.position_name)
      .join('/');
    
    return otherPositions ? `${otherPositions}` : '';
  }
}

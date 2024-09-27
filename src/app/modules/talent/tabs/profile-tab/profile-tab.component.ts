import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditGeneralDetailsComponent } from '../../edit-general-details/edit-general-details.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';

@Component({
  selector: 'talent-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss'
})
export class ProfileTabComponent {
  user:any = {}
  userNationalities:any = [];
  positions:any = [];

  @Input() userData: any;

  ngOnInit(): void {
    
    setTimeout(() => {
      console.log('profile tab', this.user);
     }, 1000);
 
    // console.log(this.userData)
    // this.positions = JSON.parse(this.userData.positions);
    // console.log(this.positions)
  }

  constructor( public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData']) {
      if(changes['userData'].currentValue.user_nationalities){
        this.userNationalities = JSON.parse(this.userData.user_nationalities);
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

  
  openEditGeneralDialog() {
    console.log('User saved');

    const dialogRef = this.dialog.open(EditGeneralDetailsComponent, {
      width: '850px',
      data: {
        first_name: 'John',
        last_name: 'Doe',
        current_club: 'FC Thun U21',
        nationality: 'Swiss',
        date_of_birth: '2004-04-21',
        place_of_birth: 'Zurich',
        height: 180,
        weight: 75,
        contract_start: '2017-05-08',
        contract_end: '2025-05-08',
        league_level: 'Professional',
        foot: 'Right'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User saved:', result);
        // Handle the save result (e.g., update the user details)
      } else {
        console.log('User canceled the edit');
      }
    });
  }

  openResetDialog() {
    console.log('User saved');

    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '600px',
      data: {
        first_name: 'John',
        last_name: 'Doe',
        current_club: 'FC Thun U21',
        nationality: 'Swiss',
        date_of_birth: '2004-04-21',
        place_of_birth: 'Zurich',
        height: 180,
        weight: 75,
        contract_start: '2017-05-08',
        contract_end: '2025-05-08',
        league_level: 'Professional',
        foot: 'Right'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User saved:', result);
        // Handle the save result (e.g., update the user details)
      } else {
        console.log('User canceled the edit');
      }
    });
  }

    // Function to get the main position from the array
  getMainPosition() {
    this.positions = JSON.parse(this.userData.positions);
    const mainPosition = this.positions.find((pos : any) => pos.main_position === 1);
    return mainPosition ? mainPosition.position_name : null;
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

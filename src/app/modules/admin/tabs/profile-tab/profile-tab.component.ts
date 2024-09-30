import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss'
})
export class ProfileTabComponent {
  user:any = {}
  userNationalities:any = [];

  @Input() userData: any;
  constructor(){
    console.log('coming this data',this.userData);
    
  }
  ngAfterViewInit(){
    //console.log('coming this data',this.userData)
  }
  ngOnInit(): void {
    this.user = localStorage.getItem('userData');
    this.user = JSON.parse(this.user);
  }

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
}

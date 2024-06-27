// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-setting',
//   templateUrl: './setting.component.html',
//   styleUrl: './setting.component.scss'
// })
// export class SettingComponent implements OnInit{
// userdata :any;

//   ngOnInit(): void {
//     const userDataString = localStorage.getItem('userdata');
//     console.log(userDataString, "chek the userdata ")
//     if(userDataString){
//      this.userdata = JSON.parse(userDataString);
//      console.log('Retrive user data', this.userdata )
//     }else{
//       console.log('No user data found in local storage.');
//     }
//   }
  
// }


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  userData: any;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contactNumber: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipcode: string = '';
  password: string = '';

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    console.log(userDataString, "check the userdata")
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log('Retrieve user data', this.userData);

      // Set properties
      this.firstName = this.userData.first_name || '';
      this.lastName = this.userData.last_name || '';
      this.email = this.userData.username || '';
    } else {
      console.log('No user data found in local storage.');
    }
  }
}

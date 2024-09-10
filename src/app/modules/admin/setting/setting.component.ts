
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { UserService } from '../../../services/user.service';
import {  MatDialog } from '@angular/material/dialog';

import { TeamMemberDetailComponent } from './teamMember/teamMember.detail.component';

import {
  MatDialogRef,
} from '@angular/material/dialog';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
     ) {}

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
  image: string = '';

  profileData: any;
  error: string | null = null;

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    console.log(userDataString, "check the userdata")
    if (userDataString) {
      this.userData = JSON.parse(userDataString);

      // Set properties
      this.firstName = this.userData.first_name || '';
      this.lastName = this.userData.last_name || '';
      this.email = this.userData.username || '';
    } else {
      console.log('No user data found in local storage.');
    }
    // this.fetchProfileData();
  }

  editTeamMember(){
    console.log('Edit user button clicked!');
    const dialogRef = this.dialog.open(TeamMemberDetailComponent,
     {
      height: '380px',
      width: '500px',
  });
}



  // fetchProfileData(): void {
  //   this.userService.getProfileData().subscribe(
  //     (response) => {
  //       console.log('Profile Data:', response);
  //       this.profileData = response.data.user_data;
  //     },
  //     (error) => {
  //       this.error = 'Failed to fetch profile data.';
  //       console.error('Error fetching profile data:', error);
  //     }
  //   );
  // }

  // selectAllActivity() {
  //   this.allSelectedActivity = !this.allSelectedActivity;
  //   if (this.allSelectedActivity) {
  //     this.selectedUserIds = this.users.map(user => user.id);
  //   } else {
  //     this.selectedUserIds = [];
  //   }
  //   console.log('Selected user IDs:', this.selectedUserIds);

}

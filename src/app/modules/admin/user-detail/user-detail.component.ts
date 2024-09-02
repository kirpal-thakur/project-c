import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
   isActive:string = '1';
   constructor(private route: ActivatedRoute, private userService: UserService) { }
   userId: any = {};
   user: any = {};
   userNationalities: any = [];
   coverImage: any = "";
   ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.userId = JSON.parse(params['user']);
        console.log('User data:', this.userId);  // Log the user data 
        this.getUserProfile(this.userId)
      }
    });
  }

  getUserProfile(userId:any){
    try {
      this.userService.getProfileData(userId).subscribe((response)=>{
        if (response && response.status && response.data && response.data.user_data) {
          this.user = response.data.user_data; 
          this.userNationalities = JSON.parse(this.user.user_nationalities);

          if(this.user.meta && this.user.meta.cover_image_path){
            this.coverImage = this.user.meta.cover_image_path;
          }
          // this.isLoading = false;
        } else {
          // this.isLoading = false;
          console.error('Invalid API response structure:', response);
        }
      });     
    } catch (error) {
      // this.isLoading = false;
      console.error('Error fetching users:', error);
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

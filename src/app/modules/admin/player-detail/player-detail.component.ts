import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss'
})
export class PlayerDetailComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private userService: UserService, public dialog: MatDialog) { }
  activeTab: string = 'profile';
  userId: any = {};
  user: any = {};
  // userNationalities: any = [];
  coverImage: any = "";

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      console.log(params.id)
      this.userId = params.id;
      this.getUserProfile(this.userId);
    });
  }

  getUserProfile(userId:any){
    try {
      this.userService.getProfileData(userId).subscribe((response)=>{
        if (response && response.status && response.data && response.data.user_data) {
          this.user = response.data.user_data; 
          // this.userNationalities = JSON.parse(this.user.user_nationalities);
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

  changeUserStatus(currentStatus:any){
    let newStatus = 2;
    if(currentStatus == 2){
      newStatus = 3;
    }
    
    this.userService.updateUserStatus([this.userId], newStatus).subscribe(response => {
        this.user.status = newStatus;
        this.showMatDialog('User status updated successfully!', 'display');
      },
      error => {
        console.error('Error updating user status:', error);
        this.showMatDialog('Error updating user status. Please try again.', 'display');
      }
    );
  }

  showMatDialog(message:string, action:string){
    const messageDialog = this.dialog.open(MessagePopupComponent,{
      width: '500px',
      position: {
        top:'150px'
      },
      data: {
        message: message,
        action: action
      }
    })

    messageDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(result.action == "delete-confirmed"){
          // this.deleteUsers();
        }
      //  console.log('Dialog result:', result);
      }
    });
  }

  /*calculateAge(dob: string | Date): number {
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
  }*/

  switchTab(tab: string){
    this.activeTab = tab;
  }
}

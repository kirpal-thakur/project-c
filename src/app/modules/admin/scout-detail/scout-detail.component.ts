import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';

@Component({
  selector: 'app-scout-detail',
  templateUrl: './scout-detail.component.html',
  styleUrl: './scout-detail.component.scss'
})

export class ScoutDetailComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private userService: UserService, public dialog: MatDialog, private router: Router) { }
  activeTab: string = 'profile';
  userId: any = {};
  user: any = {};
  // userNationalities: any = [];
  coverImage: any = "";

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      console.log(params.id)
      // this.userId = params.id;
      this.userId = 59;
      this.getUserProfile(this.userId);
      this.activeTab = 'profile';
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
          this.deleteUser();
        }
      //  console.log('Dialog result:', result);
      }
    });
  }

  switchTab(tab: string){
    this.activeTab = tab;
  }

  confirmDeletion(){
    this.showMatDialog("", "delete-confirmation");
  }


  deleteUser(){
    this.userService.deleteUser([this.userId]).subscribe(
      response => {
        this.showMatDialog('User deleted successfully!', 'display');
        this.router.navigate(['/admin/users']);
      },
      error => {
        console.error('Error deleting user:', error);
        this.showMatDialog('Error deleting user. Please try again.', 'display');
      }
    );
  }

  handleCoverImageData(data: string) {
    this.coverImage = data; // Assign the received data to a variable
    console.log('Data received from child:', data);
  }
}

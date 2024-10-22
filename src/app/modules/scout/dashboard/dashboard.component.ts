import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TalentService } from '../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonalDetailsComponent } from '../edit-personal-details/edit-personal-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit {
  loggedInUser:any = localStorage.getItem('userData');
  
  constructor(private route: ActivatedRoute, private userService: UserService,private talentService: TalentService, public dialog: MatDialog, private router: Router) { }
  activeTab: string = 'profile';
  userId: any ;
  user: any = {};
  userNationalities: any = [];
  coverImage: any = "";
  profileImage: any = "";
  selectedFile : any;
  teams : any;
  highlights : any;
  userImages: any = [];
  userVideos: any = [];
  imageBaseUrl : any;
  defaultCoverImage:any = "./media/palyers.png";

  @Output() dataEmitter = new EventEmitter<string>();

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.userId = this.loggedInUser.id;
    this.getUserProfile(this.userId);
    this.getHighlightsData();
    this.getGalleryData();
    
    this.route.params.subscribe(() => {
      this.getCoverImg();
      this.activeTab = 'profile';
    });    
    
    if(this.coverImage == ""){
      this.coverImage = this.defaultCoverImage;
    }
    this.getAllTeams();
  }
  
  openEditDialog() {
    const dialogRef = this.dialog.open(EditPersonalDetailsComponent, {
      width: '800px',
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

    		this.getUserProfile(this.userId);

      } else {
        console.log('User canceled the edit');
      }
    });
  }
  
  openHighlight() {
    // const dialogRef = this.dialog.open(EditHighlightsComponent, {
    //   width: '800px',
    //   data: {
    //       images: this.userImages ,
    //       videos: this.userVideos , 
    //       url: this.imageBaseUrl 
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getHighlightsData()
    // });

  }

  
  getGalleryData(){
    try {
      this.talentService.getGalleryData().subscribe((response)=>{
        if (response && response.status && response.data) {
          this.userImages = response.data.images; 
          this.userVideos = response.data.videos; 
          this.imageBaseUrl = response.data.file_path;
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      // this.isLoading = false;
      console.error('Error fetching users:', error);
    }
  }
  
  getUserProfile(userId:any){
    try {
      this.talentService.getProfileData(userId).subscribe((response)=>{
        if (response && response.status && response.data && response.data.user_data) {
          this.user = response.data.user_data; 
          console.log('user:', this.user);

          this.userNationalities = JSON.parse(this.user.user_nationalities);
          if(this.user.meta.profile_image_path ){
            this.profileImage = this.user.meta.profile_image_path;
          }
          if(this.user.meta.cover_image_path){
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
  

  getHighlightsData(){
    try {
      this.talentService.getHighlightsData().subscribe((response)=>{
        if (response && response.status && response.data && response.data.images) {
          this.highlights = response.data; 
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

  getCoverImg(){
    try {
      this.talentService.getCoverImg().subscribe((response)=>{
        if (response && response.status && response.data && response.data.userData) {          
            this.coverImage = response.data.userData.cover_image_path;          
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
    
  onProfileFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      try {

        const formdata = new FormData();
        formdata.append("profile_image", this.selectedFile);

        this.talentService.uploadProfileImage(formdata).subscribe((response)=>{
          if (response && response.status) {
            this.profileImage = "https://api.socceryou.ch/uploads/"+response.data.uploaded_fileinfo;
            this.dataEmitter.emit(this.profileImage); // Emitting the data
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
  }

  onCoverFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      try {

        const formdata = new FormData();
        formdata.append("cover_image", this.selectedFile);

        this.talentService.uploadCoverImage(formdata).subscribe((response)=>{
          if (response && response.status) {
            this.coverImage = "https://api.socceryou.ch/uploads/"+response.data.uploaded_fileinfo;
            this.dataEmitter.emit(this.coverImage); // Emitting the data
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
  }

  deleteCoverImage(){
    try {
      this.talentService.deleteCoverImage().subscribe((response)=>{
        if (response && response.status) {
          setTimeout(() => {
            this.coverImage = './media/palyers.png';
          }, 100);
          this.dataEmitter.emit(''); // Emitting the data
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

  
  openDeleteDialog() {
    // const dialogRef = this.dialog.open(DeletePopupComponent, {
    //   width: '600px',
    // });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // If result is true, proceed with deletion logic
    //     this.deleteCoverImage();
    //   } else {
    //     console.log('User canceled the delete');
    //   }
    // });
  }
  
  showMatDialog(message:string, action:string){
    // const messageDialog = this.dialog.open(MessagePopupComponent,{
    //   width: '500px',
    //   position: {
    //     top:'150px'
    //   },
    //   data: {
    //     message: message,
    //     action: action
    //   }
    // })

    // messageDialog.afterClosed().subscribe(result => {
    //   if (result !== undefined) {
    //     if(result.action == "delete-confirmed"){
    //       this.deleteUser();
    //     }
    //   //  console.log('Dialog result:', result);
    //   }
    // });
  }
  
  getAllTeams(){
    this.talentService.getTeams().subscribe((data) => {
      this.teams = data;
    });
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


  switchTab(tab: string){
    this.activeTab = tab;
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

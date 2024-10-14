import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent  implements OnInit {
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
    
    this.route.params.subscribe((params:any) => {
      this.userId = params.id;
      this.getUser(this.userId);      
      this.getHighlightsData(this.userId);
      this.getGalleryData(this.userId);
      this.activeTab = 'profile';
    });
    
    if(this.coverImage == ""){
      this.coverImage = this.defaultCoverImage;
    }
  }
  
  getGalleryData(id:any){
    try {
      this.talentService.getGalleryFiles(id).subscribe((response)=>{
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
  
  getUser(userId:any){
    try {
      this.talentService.getUser(userId).subscribe((response)=>{
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
  
  getHighlightsData(id:any){
    try {
      this.talentService.getHighlightsFiles(id).subscribe((response)=>{
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

  handleCoverImageData(data: string) {
    this.coverImage = data; // Assign the received data to a variable
    console.log('Data received from child:', data);
  }
}

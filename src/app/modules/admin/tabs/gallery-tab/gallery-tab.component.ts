import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-gallery-tab',
  templateUrl: './gallery-tab.component.html',
  styleUrl: './gallery-tab.component.scss'
})
export class GalleryTabComponent {
  
  userId: any = '';
  userImages: any = [];
  imageBaseUrl: any = "";
  @Input() coverImage: string = '';  // Define an input property
  constructor(private route: ActivatedRoute, private userService: UserService) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.userId = JSON.parse(params['user']);
        console.log('User data:', this.userId);  // Log the user data 
        this.getUserGallery(this.userId)
      }
    });

    if(this.coverImage == ""){
      this.coverImage = './media/palyers.png';
    }
  }

  getUserGallery(userId:any){
    console.log(userId)
    try {
      this.userService.getGalleryData(userId).subscribe((response)=>{
        if (response && response.status && response.data) {
          this.userImages = response.data.images; 
          this.imageBaseUrl = response.data.file_path;
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

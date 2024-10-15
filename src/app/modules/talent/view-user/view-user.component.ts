import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  loggedInUser: any = localStorage.getItem('userData');
  activeTab: string = 'profile';
  userId: any;
  user: any = {};
  userNationalities: any = [];
  coverImage: any = '';
  profileImage: any = '';
  selectedFile: any;
  teams: any;
  highlights: any;
  userImages: any = [];
  userVideos: any = [];
  imageBaseUrl: any;
  defaultCoverImage: any = './media/palyers.png';
  isFavorite: boolean = false; // Added to track favorite status
  downloadPath: any='';

  @Output() dataEmitter = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private talentService: TalentService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params.id;
      this.getUser(this.userId);
      this.getHighlightsData(this.userId);
      this.getGalleryData(this.userId);
      this.exportSingleUser(this.userId);
      this.activeTab = 'profile';
    });

    if (this.coverImage == '') {
      this.coverImage = this.defaultCoverImage;
    }
  }

  getUser(userId: any) {
    try {
      this.talentService.getUser(userId).subscribe((response) => {
        if (response && response.status && response.data && response.data.user_data) {
          this.user = response.data.user_data;
          this.userNationalities = JSON.parse(this.user.user_nationalities);
          this.profileImage = this.user.meta.profile_image_path || this.profileImage;
          this.coverImage = this.user.meta.cover_image_path || this.coverImage;

          // Set isFavorite status based on user data or API response
          this.isFavorite = this.user.is_favorite; // Assuming API returns this
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  getGalleryData(id: any) {
    try {
      this.talentService.getGalleryFiles(id).subscribe((response) => {
        if (response && response.status && response.data) {
          this.userImages = response.data.images;
          this.userVideos = response.data.videos;
          this.imageBaseUrl = response.data.file_path;
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  }

  getHighlightsData(id: any) {
    try {
      this.talentService.getHighlightsFiles(id).subscribe((response) => {
        if (response && response.status && response.data && response.data.images) {
          this.highlights = response.data;
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  }

  calculateAge(dob: string | Date): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  handleCoverImageData(data: string) {
    this.coverImage = data;
  }

  // Toggle favorite status
  toggleFavorite(userId: number) {
    if (this.isFavorite) {
      this.removeFromFavorites(userId);
    } else {
      this.addToFavorites(userId);
    }
  }

  addToFavorites(userId: number) {

    try {
      this.userService.addFavoritesData(userId).subscribe((response) => {
        if (response && response.status && response.data) {
          this.isFavorite = true; // Mark as favorite
          console.log(userId)

        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }

  }

  removeFromFavorites(userId: number) {
    try {
      this.userService.removeFavoritesData(userId).subscribe((response) => {
        if (response && response.status && response.data) {
          this.isFavorite = false; // Mark as not favorite
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }

  exportSingleUser(userId: number) {

    try {
      this.userService.exportSingleUser(userId).subscribe((response) => {
        if (response && response.status && response.data) {
          this.downloadPath = response.data.file_path; 
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }

  }
  
}

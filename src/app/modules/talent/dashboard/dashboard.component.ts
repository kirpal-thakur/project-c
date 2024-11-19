import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { TalentService } from '../../../services/talent.service';
import { EditPersonalDetailsComponent } from '../edit-personal-details/edit-personal-details.component';
import { EditHighlightsComponent } from '../tabs/edit-highlights/edit-highlights.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import introJs from 'intro.js';
import 'intro.js/introjs.css'; // Import the styles for Intro.js
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loggedInUser:any = localStorage.getItem('userData');
  countryFlagUrl : any;
  
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private talentService: TalentService,    
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private lightbox: Lightbox
  ) { }
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
  premium : any = false;
  booster : any = false;
  activeDomains : any;
  countries :  any;
  isPremium: any = false;

  @Output() dataEmitter = new EventEmitter<string>();
  
  loading: boolean = true;  // Add this line to track loading state

  async ngOnInit() {
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.userId = this.loggedInUser.id;
    
    // Adding a slight delay to ensure elements are rendered before the tour starts
    this.getUserProfile(this.userId);
    this.getHighlightsData();
    this.loadCountries();
    this.getGalleryData();
    
    this.route.params.subscribe(() => {
      this.getCoverImg();
      this.activeTab = 'profile';
    });
    
    if (this.coverImage == "") {
      this.coverImage = this.defaultCoverImage;
    }
    await this.getAllTeams();
    
    setTimeout(() => {
      this.startIntroTour(); // Start the tour after a slight delay
    }, 2500);
  }

  ngAfterViewInit() {
  }


  /**
   * Starts the Intro.js tour.
   */
  startIntroTour() {
    const intro = introJs();
    intro.setOption("dontShowAgain", true).start();

    intro.setOptions({
      steps: [
        {
          element: '.edit-profile',
          intro: '<h6>Profile Photo</h6>Upload your best headshot',
          position: 'right',
          tooltipClass: 'custom-tooltip', // Custom class for this step
        },
        {
          element: '.tour-personal-details',
          intro: '<h6>Personal Details</h6>Add your personal details here',
          position: 'right',
          tooltipClass: 'custom-tooltip', // Custom class for this step
        },
        {
          element: '.tour-highlights',
          intro: '<h6>Highlights</h6>Upload photos and videos to highlight on your profile',
          position: 'right',
          tooltipClass: 'custom-tooltip', // Custom class for this step
        },
        {
          element: '.tour-cover-photo',
          intro: '<h6>Cover Photo</h6>Upload your cover photo',
          position: 'top',
          tooltipClass: 'custom-tooltip', // Custom class for this step
        },
        {
          element: '.tour-general-details',
          intro: '<h6>General Details</h6>Add your other profile details here',
          position: 'right',
          tooltipClass: 'custom-tooltip', // Custom class for this step
        }
      ],
      showBullets: false, // Optional: Disable bullets for a cleaner UI
      showProgress: false, // Optional: Show progress bar
      scrollToElement: true, // Automatically scroll to elements
    });

    intro.setOption("prevLabel", "Previous");
    intro.start(); // Start the tour
  }

  getGalleryData() {
    this.loading = true;  // Set loading to true before making the API call
    try {
      this.talentService.getGalleryData().subscribe((response) => {
        if (response && response.status && response.data) {
          this.userImages = response.data.images;
          this.userVideos = response.data.videos;
          this.imageBaseUrl = response.data.file_path;
        } else {
          console.error('Invalid API response structure:', response);
        }
        this.loading = false;  // Set loading to false once data is loaded
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      this.loading = false;  // Set loading to false on error
    }
  }

  getUserProfile(userId: any) {
    this.loading = true;  
    // Set loading to true before making the API call
    try {
      this.talentService.getProfileData(userId).subscribe((response) => {
        if (response && response.status && response.data && response.data.user_data) {
          
          localStorage.setItem('userInfo', JSON.stringify(response.data.user_data));

          this.user = response.data.user_data;
          this.userNationalities = JSON.parse(this.user.user_nationalities);
          this.isPremium = this.user?.active_subscriptions?.premium.length>0 ? true : false ;
          this.premium = this.user.active_subscriptions?.premium?.length > 0 ? true : false;
          this.booster = this.user.active_subscriptions?.booster?.length > 0 ? true : false;
          this.activeDomains = this.user.active_subscriptions?.country?.length > 0 ? true : false;

          if (this.user.meta.profile_image_path) {
            this.profileImage = this.user.meta.profile_image_path;
            this.sendMessage()
          }
          if (this.user.meta.cover_image_path) {
            this.coverImage = this.user.meta.cover_image_path;
          }

          this.getCountryFromPlaceOfBirth(this.user?.meta?.place_of_birth)
        } else {
          console.error('Invalid API response structure:', response);
        }
        this.loading = false;  // Set loading to false once data is loaded
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      this.loading = false;  // Set loading to false on error
    }
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditPersonalDetailsComponent, {
      width: '800px',
      data: {user : this.user , countries : this.countries}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    		this.getUserProfile(this.userId);
      } else {
        console.log('User canceled the edit');
      }
    });
  }
  
  openHighlight() {

    const dialogRef = this.dialog.open(EditHighlightsComponent, {
      width: '800px',
      data: {
          images: this.userImages ,
          videos: this.userVideos , 
          url: this.imageBaseUrl 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHighlightsData()
    });

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

  openImage(index: number): void {
   
    // Open image at the provided index in the lightbox
    const album = this.highlights.images.map((image:any) => ({
      src: this.highlights.file_path + image.file_name,
      caption: image.file_name,
      thumb: this.highlights.file_path + image.file_name
    }));
    
    this.lightbox.open(album, index); // Open the lightbox at the given image index

  }

  closeLightbox(): void {
    this.lightbox.close(); // Close the lightbox
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

      // Set loading state and display info toast
      this.toastr.info('Uploading profile image...', 'Please wait', { disableTimeOut: true });

      try {
        const formData = new FormData();
        formData.append("profile_image", this.selectedFile);

        this.talentService.uploadProfileImage(formData).subscribe(
          (response) => {
            if (response && response.status) {
              this.profileImage = `https://api.socceryou.ch/uploads/${response.data.uploaded_fileinfo}`;
              this.dataEmitter.emit(this.profileImage);  // Emit updated profile image
              this.toastr.clear();

              this.toastr.success('Profile image uploaded successfully!', 'Success');
            } else {
              this.toastr.clear();
              this.toastr.error('Failed to upload profile image. Please try again.', 'Upload Failed');
              console.error('Invalid API response structure:', response);
            }
          },
          (error) => {
              this.toastr.clear();
            this.toastr.error('An error occurred during upload. Please try again.', 'Upload Error');
            console.error('Error uploading profile image:', error);
          },
        );
      } catch (error) {
              this.toastr.clear();
        this.toastr.error('An unexpected error occurred. Please try again.', 'Upload Error');
        console.error('Error during file upload:', error);
      }
    }
  }

  sendMessage() {
    this.talentService.updatePicOnHeader(this.profileImage);
  }


  onCoverFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Set loading state and display info toast
      this.toastr.info('Uploading cover image...', 'Please wait', { disableTimeOut: true });

      try {
        const formData = new FormData();
        formData.append("cover_image", this.selectedFile);

        this.talentService.uploadCoverImage(formData).subscribe(
          (response) => {
            if (response && response.status) {
              this.coverImage = `https://api.socceryou.ch/uploads/${response.data.uploaded_fileinfo}`;
              this.dataEmitter.emit(this.coverImage);  // Emit updated cover image
              this.toastr.clear();
              this.toastr.success('Cover image uploaded successfully!', 'Success');
            } else {
              this.toastr.clear();
              this.toastr.error('Failed to upload cover image. Please try again.', 'Upload Failed');
              console.error('Invalid API response structure:', response);
            }
          },
          (error) => {
              this.toastr.clear();
            this.toastr.error('An error occurred during upload. Please try again.', 'Upload Error');
            console.error('Error uploading cover image:', error);
          },
        );
      } catch (error) {
              this.toastr.clear();
        this.toastr.error('An unexpected error occurred. Please try again.', 'Upload Error');
        console.error('Error during cover image upload:', error);
      }
    }
  }

  deleteCoverImage(): void {
    // Set loading state and display info toast
    this.toastr.info('Deleting cover image...', 'Please wait', { disableTimeOut: true });

    try {
      this.talentService.deleteCoverImage().subscribe(
        (response) => {
          if (response && response.status) {
            this.coverImage = './media/players.png';  // Reset to default image
            this.dataEmitter.emit('');  // Emit empty string to indicate deletion
              this.toastr.clear();
            this.toastr.success('Cover image deleted successfully.', 'Success');
          } else {
              this.toastr.clear();
            this.toastr.error('Failed to delete cover image. Please try again.', 'Delete Failed');
            console.error('Invalid API response structure:', response);
          }
        },
        (error) => {
              this.toastr.clear();
          this.toastr.error('An error occurred during deletion. Please try again.', 'Delete Error');
          console.error('Error deleting cover image:', error);
        },
      );
    } catch (error) {
              this.toastr.clear();
      this.toastr.error('An unexpected error occurred. Please try again.', 'Delete Error');
      console.error('Error during cover image deletion:', error);
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If the user confirms, proceed with deletion
        this.deleteCoverImage();
      } else {
        this.toastr.info('Cover image deletion canceled.', 'Canceled');
        console.log('User canceled the delete');
      }
    });
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
      }
    });
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
        this.router.navigate(['/talent/dashboard']);
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

  getCountryFromPlaceOfBirth(placeOfBirth: string): void {
    if (!placeOfBirth) {
      console.error("Place of birth is empty.");
      return;
    }
  
    const apiKey = environment.googleApiKey;  // Replace with your Google Maps API key
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeOfBirth)}&key=${apiKey}`;
  
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK' && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
  
          // Extract country from address components
          const countryComponent = addressComponents.find((component: any) => 
            component.types.includes('country')
          );
  
          if (countryComponent) {
            const country = countryComponent.short_name;  // Set country name, use short_name for country code
            this.getCountryFlag(country);
            console.log("Country found:", countryComponent);
          } else {
            console.error("Country not found in placeOfBirth.");
          }
        } else {
          console.error("Geocoding API error:", data.status, data.error_message);
        }
      })
      .catch(error => console.error("Error fetching geocoding data:", error));
  }
  
  getCountryFlag(countryCode: string): void {
    // Using Flagpedia API for flag images
    const flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
    
    // Set the URL to an <img> element in your template or save it in a variable
    this.countryFlagUrl = flagUrl;
  }

  
  // After loading, mark countries as loaded and check if both are ready
  loadCountries() {
    return this.talentService.getCountries().subscribe(
      (response) => {
        if (response && response.status) {
          this.countries = response.data.countries;
        }
    });
  }

}

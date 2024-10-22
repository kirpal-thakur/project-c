import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../../services/talent.service';
import { UploadPopupComponent } from '../../upload-popup/upload-popup.component';

@Component({
  selector: 'app-edit-highlights',
  templateUrl: './edit-highlights.component.html',
  styleUrls: ['./edit-highlights.component.scss']
})
export class EditHighlightsComponent {

  images: any = [];
  videos: any = [];
  url: string = '';
  maxUploads: number = 6; // Limit the number of uploads
  selectedImageIds: number[] = [];
  selectedVideoIds: number[] = [];
  totalSelected: number = 0; // Track total selected files
  loggedInUser:any = localStorage.getItem('userData');
  userId:any;

  constructor(
    public dialogRef: MatDialogRef<EditHighlightsComponent>,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.userId = this.loggedInUser.id;
    this.images = this.data.images || [];
    this.videos = this.data.videos || [];
    this.url = this.data.url || '';

    // Preselect images that are already featured
    this.images.forEach((image: any) => {
      if (image.is_featured != 0) {
        this.selectedImageIds.push(image.id);
        this.totalSelected++; // Increment total selected count
      }
    });

    // Preselect videos that are already featured
    this.videos.forEach((video: any) => {
      if (video.is_featured != 0) {
        this.selectedVideoIds.push(video.id);
        this.totalSelected++; // Increment total selected count
      }
    });
  }

  // Called when an image checkbox is toggled
  onImageSelect(event: Event, imageId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked && this.totalSelected >= this.maxUploads) {
      alert(`You can only select a maximum of ${this.maxUploads} files.`);
      (event.target as HTMLInputElement).checked = false; // Deselect the checkbox
      return;
    }

    if (isChecked) {
      this.selectedImageIds.push(imageId);
      this.totalSelected++; // Increment total selected count
    } else {
      this.selectedImageIds = this.selectedImageIds.filter(id => id !== imageId);
      this.totalSelected--; // Decrement total selected count
    }
  }

  // Called when a video checkbox is toggled
  onVideoSelect(event: Event, videoId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked && this.totalSelected >= this.maxUploads) {
      alert(`You can only select a maximum of ${this.maxUploads} files.`);
      (event.target as HTMLInputElement).checked = false; // Deselect the checkbox
      return;
    }

    if (isChecked) {
      this.selectedVideoIds.push(videoId);
      this.totalSelected++; // Increment total selected count
    } else {
      this.selectedVideoIds = this.selectedVideoIds.filter(id => id !== videoId);
      this.totalSelected--; // Decrement total selected count
    }
  }

  // Called when the save button is clicked
  onSubmit(): void {
    const selectedData = [...this.selectedImageIds, ...this.selectedVideoIds];

    // Send the selected IDs to your API or handle them as needed
    console.log('Selected Data:', selectedData);

    // Example: If you use a service to send data
    this.talentService.toggleFeaturedFiles(selectedData).subscribe(response => {
      // Handle the response
      console.log('Save successful', response);
      this.dialogRef.close();  // Close the dialog if needed
    });
  }

  // Handle file input change (Photos or Videos)
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      if (this.totalSelected + files.length > this.maxUploads) {
        alert(`You can only upload a maximum of ${this.maxUploads} files.`);
        return;
      }

      files.forEach((file: File) => {
        const fileType = file.type.split('/')[0]; // Detect if it's an image or video
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const uploadedFile = { full_name: e.target.result, selected: true, file };

          if (fileType === 'image' && this.images.length < this.maxUploads) {
            this.images.push(uploadedFile);
            this.totalSelected++; // Increment total selected count
          } else if (fileType === 'video' && this.videos.length < this.maxUploads) {
            this.videos.push(uploadedFile);
            this.totalSelected++; // Increment total selected count
          }
        };

        reader.readAsDataURL(file);
      });
    }
  }

  
  addPhotosPopup(){
    const messageDialog = this.dialog.open(UploadPopupComponent,{
      width: '500px',
      position: {
        top:'150px'
      },
      data: {
        userId: this.userId
      }
    })

    messageDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(result.files.length){
          console.log(result.files)
         this.images = [...result.files, ...this.images];
         console.log(this.images)
        }
      }
    });
  }
}

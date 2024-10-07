import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../../services/talent.service';

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

  constructor(
    public dialogRef: MatDialogRef<EditHighlightsComponent>,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.images = this.data.images || [];
    this.videos = this.data.videos || [];
    this.url = this.data.url || '';
  }

  
  // Called when an image checkbox is toggled
  onImageSelect(event: Event, imageId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
        // Add selected image ID
        this.selectedImageIds.push(imageId);
    } else {
        // Remove deselected image ID
        this.selectedImageIds = this.selectedImageIds.filter(id => id !== imageId);
    }
  }

  // Called when a video checkbox is toggled
  onVideoSelect(event: Event, videoId: number): void {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
          // Add selected video ID
          this.selectedVideoIds.push(videoId);
      } else {
          // Remove deselected video ID
          this.selectedVideoIds = this.selectedVideoIds.filter(id => id !== videoId);
      }
  }

  // Called when the save button is clicked
  onSubmit(): void {
      const selectedData = {
          images: this.selectedImageIds,
          videos: this.selectedVideoIds
      };

      // Send the selected IDs to your API or handle them as needed
      console.log('Selected Data:', selectedData);

      // Example: If you use a service to send data
      // this.yourService.saveSelectedData(selectedData).subscribe(response => {
      //     // Handle the response
      //     console.log('Save successful', response);
      //     this.dialogRef.close();  // Close the dialog if needed
      // });
  }

  // Handle file input change (Photos or Videos)
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach((file: File) => {
        const fileType = file.type.split('/')[0]; // Detect if it's an image or video
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
          const uploadedFile = { full_name: e.target.result, selected: true, file };

          if (fileType === 'image' && this.images.length < this.maxUploads) {
            this.images.push(uploadedFile);
          } else if (fileType === 'video' && this.videos.length < this.maxUploads) {
            this.videos.push(uploadedFile);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  }

  // Save selected images and videos
  saveHighlights(): void {
    const selectedImages = this.images.filter((image: any) => image.selected);
    const selectedVideos = this.videos.filter((video: any) => video.selected);

    // Prepare form data for upload
    const formData = new FormData();
    selectedImages.forEach((image: any) => formData.append('gallery_images', image.file));
    selectedVideos.forEach((video: any) => formData.append('gallery_videos', video.file));

    // Call the service to save
    this.talentService.uploadGalleryImages(formData).subscribe(
      (response) => {
        // Handle success
        console.log('Highlights saved:', response);
        this.dialogRef.close({ images: selectedImages, videos: selectedVideos });
      },
      (error) => {
        console.error('Error saving highlights:', error);
      }
    );
  }

  
}

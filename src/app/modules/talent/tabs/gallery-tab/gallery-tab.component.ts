import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { UploadPopupComponent } from '../../upload-popup/upload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TalentService } from '../../../../services/talent.service';
import { DeletePopupComponent } from '../../delete-popup/delete-popup.component';

@Component({
  selector: 'talent-gallery-tab',
  templateUrl: './gallery-tab.component.html',
  styleUrl: './gallery-tab.component.scss'
})
export class GalleryTabComponent {
  
  userId: any = '';
  userImages: any = [];
  userVideos: any = [];
  imageBaseUrl: any = "";
  selectedFile: any = '';
  defaultCoverImage:any = "./media/palyers.png";
  openedMenuId:any = '';
  @Input() coverImage: string = '';  // Define an input property
  @Output() dataEmitter = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private userService: UserService,private talentService: TalentService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      // console.log(params.id)
      this.userId = params.id;
      this.getGalleryData()
    });
    
    if(this.coverImage == ""){
      this.coverImage = this.defaultCoverImage;
    }
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

  onCoverFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      console.log(this.selectedFile)
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
         this.userImages = [...result.files, ...this.userImages];
         console.log(this.userImages)
        }
      }
    });
  }

  openMenu(id:any){
    this.openedMenuId = id;
  }

  deleteImage(id:any){    
    try {
        let params = {id: [id]};
        this.talentService.deleteGalleryImage(params).subscribe((response)=>{
            if (response && response.status) {
              let index = this.userImages.findIndex((x:any) => x.id == id)
              this.userImages.splice(index, 1);
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

  
  openDeleteDialog(id:any) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If result is true, proceed with deletion logic
        this.deleteImage(id);
      } else {
        console.log('User canceled the delete');
      }
    });
  }
  
  downloadImage(baseUrl:any, image:any){

    fetch(baseUrl+image)
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.blob(); // Convert the response to a Blob object
     })
     .then(blob => {
      this.openedMenuId = '';
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = image; // Set the filename for download
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
     })
     .catch(error => {
       console.error('There was an error downloading the file:', error);
     });
  } 

}

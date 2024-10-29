import { Component, Input, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../services/user.service';
import { TalentService } from '../../../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'view-user-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  userId: any = '';
  userImages: any = [];
  userVideos: any = [];
  imageBaseUrl: any = "";
  selectedFile: any = '';
  defaultCoverImage:any = ".";
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

}


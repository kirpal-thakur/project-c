import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { CreateSightPopupComponent } from '../create-sight-popup/create-sight-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { InviteTalentPopupComponent } from '../invite-talent-popup/invite-talent-popup.component';

@Component({
  selector: 'app-sighting-tab',
  templateUrl: './sighting-tab.component.html',
  styleUrl: './sighting-tab.component.scss'
})


export class SightingTabComponent {
  userId: any = '';
  displayedColumns: string[] = ['#','Event', 'Manager Name', 'Place','Date','Time','View','Inquire'];
  sightings: any = [];
  totalSightings: any = '';
  allSelected: boolean = false;
  // idsToDelete: any = [];
  // imageBaseUrl: any = "";
  selectedIds: number[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  keyword:any = "";
  view:any = "listing";
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      console.log(params.id)
      this.userId = params.id;
      this.getSightings();
    });
  }

  getSightings(){
    try { 
      const page = this.paginator ? this.paginator.pageIndex*10 : 0;
      const pageSize = this.paginator ? this.paginator.pageSize : 10;
    
      let params:any = {};
      params.offset = page;
      params.search = this.keyword;
      params.limit  = pageSize;

      this.userService.getSightings(this.userId).subscribe((response)=>{
        if (response && response.status && response.data) {
          this.sightings = response.data.sightings;
          this.totalSightings = 10; //response.data.sightings.length;
          this.paginator.length = 10; //response.data.sightings.length;;
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

  onPageChange() {
    this.getSightings();
  }

  search(filterValue:any) {
   
    this.keyword = filterValue.target?.value.trim().toLowerCase();
    if(this.keyword.length >= 3){
      this.getSightings();
     } else if(this.keyword.length == 0){
      this.getSightings();
     }
   
  }

  onCheckboxChange(user: any) {
    const index = this.selectedIds.indexOf(user.id);
    if (index === -1) {
      this.selectedIds.push(user.id);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }

  navigate(id:string): void {
    let pageRoute = 'admin/'+id.toLowerCase();
    this.router.navigate([pageRoute, id]);
  }

  selectAllFavorites() {
    console.log('p', this.allSelected)
    this.allSelected = !this.allSelected;
    console.log('a', this.allSelected)
    if (this.allSelected) {
      this.selectedIds = this.sightings.map((fav:any) => fav.id);
    } else {
      this.selectedIds = [];
    }
    console.log('Selected IDs:', this.selectedIds);
  }

  createSightPopup(){
    const messageDialog = this.dialog.open(CreateSightPopupComponent,{
      width: '600px',
      position: {
        top:'150px'
      },
      data: {
        
      }
    })

    messageDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
         console.log('Dialog result:', result);
      }
    });
  }

  viewSight(id:any){
    this.view = 'detail';
  }

  inviteTalentsPopup(){
    const inviteDialog = this.dialog.open(InviteTalentPopupComponent,{
      width: '500px',
      position: {
        top:'150px'
      },
      data: {
        
      }
    })

    inviteDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
         console.log('Dialog result:', result);
      }
    });
  }
}
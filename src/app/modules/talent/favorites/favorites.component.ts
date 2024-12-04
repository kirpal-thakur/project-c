import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { TalentService } from '../../../services/talent.service';
import { PlayerProfileComponent } from '../player-profile/player-profile.component';


@Component({
  selector: 'talent-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})

export class FavoritesComponent {
  userId: any = '';
  displayedColumns: string[] = ['#','Name', 'User Type', 'Location','Joined Date - Time','View Profile','Remove'];
  userFavorites: any = [];
  totalFavorites: any = '';
  allSelected: boolean = false;
  idsToDelete: any = [];
  totalItems: number = 0; // Total number of items for pagination
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page index
  // imageBaseUrl: any = "";
  selectedIds: number[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  keyword:any = "";

  loggedInUser:any = localStorage.getItem('userData');

  // Filters and UI variables (other code omitted for brevity)
  viewsTracked: { [profileId: string]: { viewed: boolean, clicked: boolean } } = {}; // Track view and click per profile

  constructor(private route: ActivatedRoute, private talentService: TalentService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.loggedInUser);

    this.route.params.subscribe((params:any) => {
      this.getUserFavorites();
    });
  }

  getUserFavorites() {
    try {
      // Set pagination parameters
      const page = this.paginator ? this.paginator.pageIndex * 10 : 0;
      const pageSize = this.paginator ? this.paginator.pageSize : 10;
  
      // Prepare query parameters
      let params: any = {
        offset: page,
        limit: pageSize,
        search: this.keyword // Search keyword
      };
  
      // Make the API request with query parameters
      this.talentService.getFavoritesData(params).subscribe((response) => {
        if (response && response.status && response.data) {
          this.userFavorites = response.data[0].favorites;
          this.totalFavorites = response.data[0].totalCount;
          this.paginator.length = response.data[0].totalCount;
        } else {
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  onPageChange() {
    this.getUserFavorites();
  }

  search(filterValue:any) {   
    this.keyword = filterValue.target?.value.trim().toLowerCase();
    if(this.keyword.length >= 3){
      this.getUserFavorites();
     } else if(this.keyword.length == 0){
      this.getUserFavorites();
    }   
  }
    
  navigate(slug:string, id:Number): void {
    let pageRoute = '/'+slug.toLowerCase();
    this.router.navigate([pageRoute, id]);
  }

  onCheckboxChange(user: any) {
    const index = this.selectedIds.indexOf(user.id);
    if (index === -1) {
      this.selectedIds.push(user.id);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }

  selectAllFavorites() {
    
    this.allSelected = !this.allSelected;
    
    if (this.allSelected) {
      this.selectedIds = this.userFavorites.map((fav:any) => fav.id);
    } else {
      this.selectedIds = [];
    }
    console.log('Selected favorite IDs:', this.selectedIds);
  }

  confirmDeletion():any {
    if(this.selectedIds.length == 0){
      this.showMatDialog('Select favorite user(s) first.', 'display');
      return false;
    }
    this.idsToDelete = this.selectedIds;
    this.showDeleteConfirmationPopup();
  }

  showDeleteConfirmationPopup(){
    this.showMatDialog("", "delete-favorite-confirmation");
  }

  openViewProfile(user:any) {

    this.exploreUser(user.role_name, user.id);
    // const dialogRef = this.dialog.open(PlayerProfileComponent, {
    //   width: '800px',
    //   data: { user :  user }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('User saved:', result);
    //     // Handle the save result (e.g., update the user details)
    //   } else {
    //     console.log('User canceled the edit');
    //   }
    // });
  }

  private saveTrackedViews() {
    sessionStorage.setItem('viewsTracked', JSON.stringify(this.viewsTracked));
  }

  // Track profile click only once per session
  private trackProfileClick(profileId: number) {
    const id: number[] = [profileId];  // Create an array of profileId

    if (!this.viewsTracked[profileId]?.clicked) {
      this.talentService.trackProfiles(this.loggedInUser.id, id, 'click').subscribe({
        next: () => {
          console.log(`Click tracked for profile ${profileId}`);
          this.viewsTracked[profileId] = { ...this.viewsTracked[profileId], clicked: true };
          this.saveTrackedViews();  // Save the updated viewsTracked
        },
        error: (error) => console.error('Error tracking profile click', error)
      });
    }
  }

  exploreUser(slug: string, id: number): void {
    this.trackProfileClick(id); // Track the click before navigation
    const pageRoute = 'view/' + slug.toLowerCase();
    this.router.navigate([pageRoute, id]);
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
          this.deleteFavorites();
        }
      }
    });
  }

  deleteFavorites():any {

    let params = {id:this.idsToDelete};

    this.talentService.removeFavorites(params).subscribe(
      response => {
        if(response.status){
          this.getUserFavorites();
          this.selectedIds = [];
          this.allSelected = false;
          console.log('User deleted successfully:', response);
          this.showMatDialog('Favorite(s) removed successfully!.', 'display');
        }else{
          this.showMatDialog('Error in removing favorite. Please try again.', 'display');
        }
      },
      error => {
        console.error('Error deleting user:', error);
        
      }
    );
  }

  confirmSingleDeletion(favoriteId:any){
    this.idsToDelete = [favoriteId];
    this.showMatDialog("", "delete-favorite-confirmation");
  }
}

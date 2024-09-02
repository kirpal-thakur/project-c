import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './favorites.detail.component.html',
  styleUrl: './favorites.detail.component.scss'
})
export class FavoritesDetailComponent {
  userId: any = '';
  userFavorites: any = [];
  // imageBaseUrl: any = "";
  
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.userId = JSON.parse(params['user']);
        console.log('User data:', this.userId);  // Log the user data 
        this.getUserFavorites(this.userId)
      }
    });
  }

  getUserFavorites(userId:any){
    console.log(userId)
    try {
      this.userService.getFavoritesData(userId).subscribe((response)=>{

        console.log(response)
        if (response && response.status && response.data) {
          this.userFavorites = response.data[0].favorites;
          console.log(this.userFavorites) 
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

  navigateToUserDetail(favorite:any) {
    this.router.navigate(['Admin/User-detail'], { queryParams: { user: favorite } });
  }
}

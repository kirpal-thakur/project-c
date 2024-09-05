import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-purchase-tab',
  templateUrl: './purchase-tab.component.html',
  styleUrl: './purchase-tab.component.scss'
})
export class PurchaseTabComponent {
  userId: any = '';
  userPurchases: any = [];
  // imageBaseUrl: any = "";
  
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.userId = JSON.parse(params['user']);
        console.log('User data:', this.userId);  // Log the user data 
        this.getUserPurchases(this.userId)
      }
    });
  }

  getUserPurchases(userId:any){
    console.log(userId)
    try {
      this.userService.getPurchaseData(userId).subscribe((response)=>{

        console.log(response)
        if (response && response.status && response.data) {
          this.userPurchases = response.data.purchaseHistory;
          console.log(this.userPurchases) 
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

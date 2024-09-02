import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-transfers',
  templateUrl: './transfers.detail.component.html',
  styleUrl: './transfers.detail.component.scss',
})
export class TransfersDetailComponent {
  date = new FormControl(new Date());

  userId: any = '';
  userTransfers: any = [];
  
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.userId = JSON.parse(params['user']);
        console.log('User data:', this.userId);  // Log the user data 
        this.getUserTransfers(this.userId)
      }
    });
  }

  getUserTransfers(userId:any){
    console.log(userId)
    try {
      this.userService.getTransferData(userId).subscribe((response)=>{

        console.log(response)
        if (response && response.status && response.data) {
          this.userTransfers = response.data.transferDetail;
          console.log(this.userTransfers) 
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
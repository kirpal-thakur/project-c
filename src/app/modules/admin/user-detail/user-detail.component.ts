import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
   isActive:string = '1';
   constructor(private route: ActivatedRoute) { }
   user: any = {};

   ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.user = JSON.parse(params['user']);
        console.log('User data:', this.user);  // Log the user data
      }
    });
  }
}

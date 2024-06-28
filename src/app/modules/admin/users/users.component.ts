import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { User } from './user.model';
import { UserDetailPopupComponent } from './user-detail-popup/user-detail-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log('API Response:', response);
        if (response && response.data && response.data.userData) {
          this.users = Object.values(response.data.userData);
        } else {
          console.error('Invalid API response structure:', response);
          
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(): void {
    this.dialog.open(UserDetailPopupComponent);
  }
}

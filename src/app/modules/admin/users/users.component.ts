// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrl: './users.component.scss'
// })
// export class UsersComponent {

// }


import { Component,inject, ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { UserDetailPopupComponent } from './user-detail-popup/user-detail-popup.component'; 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {

  readonly dialog = inject(MatDialog);

  editUser(){
    const dialogRef = this.dialog.open(UserDetailPopupComponent);

  }

}

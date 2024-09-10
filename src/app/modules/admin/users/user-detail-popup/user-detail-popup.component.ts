import { Component,Inject } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail-popup',
  templateUrl: './user-detail-popup.component.html',
  styleUrl: './user-detail-popup.component.scss'
})
export class UserDetailPopupComponent {
  updatedData: any;
 
  constructor(private router: Router,
    public dialogRef : MatDialogRef<UserDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any) {
    console.log('edit user', user);

    }
  close() {
    this.dialogRef.close();
  }

  save(updatedData: any) {
    this.dialogRef.close(updatedData);
  }

  closePopup(): void {
    // Navigate to User-detail with query parameter
    this.dialogRef.close(); 
    this.router.navigate(['/Admin/User-detail'], { queryParams: { user: this.user.id } });


  }

}

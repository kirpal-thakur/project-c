import { Component,inject } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-user-detail-popup',
  templateUrl: './user-detail-popup.component.html',
  styleUrl: './user-detail-popup.component.scss'
})
export class UserDetailPopupComponent {
  readonly dialogRef = inject(MatDialogRef<UserDetailPopupComponent>);

  close(){
    this.dialogRef.close();
  }
}

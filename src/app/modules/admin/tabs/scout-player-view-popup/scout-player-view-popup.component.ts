import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
@Component({
  selector: 'app-scout-player-view-popup',
  templateUrl: './scout-player-view-popup.component.html',
  styleUrl: './scout-player-view-popup.component.scss'
})
export class ScoutPlayerViewPopupComponent {
  constructor(public dialogRef : MatDialogRef<ScoutPlayerViewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
  }

  ngOnInit(): void {
    console.log('data', this.data)
  }

  close() {
    this.dialogRef.close();
  }
}

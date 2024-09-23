import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'edit-performance-details',
  templateUrl: './edit-performance-details.component.html',
  styleUrl: './edit-performance-details.component.scss'
})
export class EditPerformanceDetailsComponent {
  user: any;
  countries: string[] = ['United States', 'Germany', 'Canada', 'India'];
  leagueLevels: string[] = ['Amateur', 'Professional', 'Semi-Pro'];
  
  constructor(public dialogRef : MatDialogRef<EditPerformanceDetailsComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.user = { ...this.data.user };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.user);
  }

  
  openEditGeneralDialog() {
    console.log('User saved');

    const dialogRef = this.dialog.open(EditPerformanceDetailsComponent, {
      width: '600px',
      data: {
        first_name: 'John',
        last_name: 'Doe',
        current_club: 'FC Thun U21',
        nationality: 'Swiss',
        date_of_birth: '2004-04-21',
        place_of_birth: 'Zurich',
        height: 180,
        weight: 75,
        contract_start: '2017-05-08',
        contract_end: '2025-05-08',
        league_level: 'Professional',
        foot: 'Right'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User saved:', result);
        // Handle the save result (e.g., update the user details)
      } else {
        console.log('User canceled the edit');
      }
    });
  }

}

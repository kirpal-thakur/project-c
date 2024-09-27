import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';

@Component({
  selector: 'edit-general-details',
  templateUrl: './edit-general-details.component.html',
  styleUrl: './edit-general-details.component.scss'
})
export class EditGeneralDetailsComponent {
  user: any;
  countries: string[] = ['United States', 'Germany', 'Canada', 'India'];
  
  constructor(public dialogRef : MatDialogRef<EditGeneralDetailsComponent>,public dialog: MatDialog,
    private talentService: TalentService,
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
    console.log(this.user)
  }

  loadCountries(): void {
    this.talentService.getCountries().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.countries = response.data.countries;
          console.log('countries',this.countries)
        }
      },
      (error: any) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

}

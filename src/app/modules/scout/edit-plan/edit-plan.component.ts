import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent {
  countries: any[] = [];
  selectedCountries: string[] = [];
  subscriptionTypeOptions = {
    MONTHLY: 'monthly',
    YEARLY: 'yearly'
  };
  subscriptionType: string = this.subscriptionTypeOptions.MONTHLY;

  @Output() buys: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<EditPlanComponent>,
    public dialog: MatDialog,
    public talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  
  ngOnInit(): void {
    this.loadCountries();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  buy(): void {
    const data = {
      selectedCountries: this.selectedCountries,
      subscriptionType: this.subscriptionType
    };
    this.buys.emit(data);
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

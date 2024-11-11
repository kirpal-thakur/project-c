import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-edit-membership-profile',
  templateUrl: './edit-membership-profile.component.html',
  styleUrls: ['./edit-membership-profile.component.scss']
})
export class EditMembershipProfileComponent {

  isLoadingCheckout: boolean = false;
  stripe: any;
  @Input() audiences = [
    { role_name: "Clubs", id: 2 },
    { role_name: "Scouts", id: 3 },
    { role_name: "Talents", id: 4 },
  ];     // List of all audiences
  selectedAudienceIds: number[] = []; // Store only audience IDs
  id: any;
  loggedInUser: any = localStorage.getItem('userInfo');
  stats: any;
  selectedAudiences:any;

  constructor(
    public dialogRef: MatDialogRef<EditMembershipProfileComponent>,
    public talentService: TalentService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    this.stats = this.data.stats;
    
    this.selectedAudiences = this.stats?.booster_audience;
    // Populate selectedAudienceIds based on data
    if (this.stats?.booster_audience?.length > 0) {
      this.selectedAudienceIds = [];
      this.stats.booster_audience.forEach((audience: any) => {
        this.selectedAudienceIds.push(audience.id);
      });
      console.log('Pre-selected Audience IDs:', this.selectedAudienceIds);
    }
    
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.id = this.data.id || [];
  }
  

  // Apply the selected audiences filter
  applyFilter() {
    console.log("Selected Audiences:", this.selectedAudienceIds);
  }

  pauseBoost() {
    this.dialogRef.close();
  }

  // Handle checkbox selection and store only the IDs
  toggleAudienceSelection(audienceId: number, event: any) {
    if (event.target.checked) {
      // Add the ID if checked
      this.selectedAudienceIds.push(audienceId);
    } else {
      // Remove the ID if unchecked
      this.selectedAudienceIds = this.selectedAudienceIds.filter(id => id !== audienceId);
    }
  }

  // Get selected audience roles by matching the selected IDs
  getSelectedAudienceRoles() {
    return this.selectedAudiences.filter((audience:any) => this.selectedAudienceIds.includes(audience.id));
  }

  saveBoost() {    
    try {      
      this.talentService.updateBoosterAudience(this.selectedAudienceIds).subscribe((response) => {
        if (response?.status) {
          this.dialogRef.close(true);
        } else {
          console.error('Failed to create checkout session', response);
        }
      });

    } catch (error) {
      console.error('Error creating  Checkout session:', error);
    }
  }

  calculateAge(dob: string | Date): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }
  
}

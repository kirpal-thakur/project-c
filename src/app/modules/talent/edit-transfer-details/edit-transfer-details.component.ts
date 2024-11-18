import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { TalentService } from '../../../services/talent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-transfer-details',
  templateUrl: './edit-transfer-details.component.html',
  styleUrls: ['./edit-transfer-details.component.scss']
})
export class EditTransferDetailsComponent {
  teams: any;  // Assume you get this data from a service
  transfer: any;  // Assume you get this data from a service

  teamTo: string = ''; // Initialize as empty string to avoid undefined issues
  teamToId: any;
  teamFrom: string = ''; // Initialize as empty string to avoid undefined issues
  teamFromId: any;
  filterTeams: any[] = []; // Initialize as empty array to avoid undefined issues
  filterTeamsFrom: any[] = []; // Initialize as empty array to avoid undefined issues
  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditTransferDetailsComponent>,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // You might want to load your teams from a service here
    this.teams = this.data.teams;
    this.transfer = this.data.transfer;
    console.log(this.teams)
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
  
  onSubmit(myForm: NgForm): void {
    if (myForm.valid) {
      this.isLoading = true; // Start loading indicator
      this.toastr.info('Updating transfer information...', 'Please wait', { disableTimeOut: true });

      // Prepare formData with additional properties
      const formData = {
        ...myForm.value,
        team_to: this.teamToId,
        team_from: this.teamFromId
      };

      this.talentService.updateTransfer(this.transfer.id, formData).subscribe(
        (response: any) => {
          if (response?.status) {
            this.toastr.clear();
            this.toastr.success('Transfer information updated successfully!', 'Success');
            this.dialogRef.close(response.data); // Close dialog and pass data
          } else {
            this.toastr.clear();
            this.toastr.error('Failed to update transfer. Please try again.', 'Error');
            console.error('Unexpected API response:', response);
          }
          this.isLoading = false; // Stop loading indicator
        },
        (error: any) => {
            this.toastr.clear();
          this.toastr.error('Error updating transfer. Please try again later.', 'Error');
          console.error('Error submitting the form:', error);
          this.isLoading = false; // Stop loading indicator
        }
      );
    } else {
      this.toastr.clear();
      this.toastr.warning('Please complete all required fields before submitting.', 'Warning');
    }
  }

  // Function to handle dynamic fetching of clubs based on search input
  onSearchTeams(): void {

    if (this.teamTo.length < 2) {
      // Don't search until the user has typed at least 2 characters
      this.filterTeams = [];
      return;
    }

    this.talentService.searchTeams(this.teamTo).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.filterTeams = response.data.teams; // Update the list of filtered clubs based on search
          console.log('Filtered teams:', this.filterTeams);
        }
      },
      (error: any) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  // Function to handle dynamic fetching of clubs based on search input
  onSearchTeamsFrom(): void {

    if (this.teamFrom.length < 2) {
      // Don't search until the user has typed at least 2 characters
      this.filterTeamsFrom = [];
      return;
    }

    this.talentService.searchTeams(this.teamFrom).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.filterTeamsFrom = response.data.teams; // Update the list of filtered clubs based on search
          console.log('Filtered teams:', this.filterTeamsFrom);
        }
      },
      (error: any) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  // Function to handle the selection of a club
  onSelectTeamTo(team: any): void {
    this.teamTo = team.team_name +'-' +team.team_type; // Set the selected team's name to the input
    this.teamToId = team.id;
    this.filterTeams = []; // Clear the suggestion list
  }

  // Function to handle the selection of a club
  onSelectTeamFrom(team: any): void {
    this.teamFrom = team.team_name +'-' +team.team_type; // Set the selected team's name to the input
    this.teamFromId = team.id;
    this.filterTeamsFrom = []; // Clear the suggestion list
  }
}

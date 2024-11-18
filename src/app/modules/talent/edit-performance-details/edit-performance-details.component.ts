import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-performance-details',
  templateUrl: './edit-performance-details.component.html',
  styleUrls: ['./edit-performance-details.component.scss']
})
export class EditPerformanceDetailsComponent implements OnInit {
  performance: any = {};
  teams: any[] = [];
  matches: any;
  goals: any;
  currentTeam: string = ''; // Initialize as empty string to avoid undefined issues
  currentTeamId: any;
  filterTeams: any[] = []; // Initialize as empty array to avoid undefined issues
  isLoading : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditPerformanceDetailsComponent>,
    private talentService: TalentService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.performance = { ...this.data.performance };
    this.teams = [...this.data.teams];
    this.matches = this.performance.matches;
    this.goals = this.performance.goals;
    console.log('teams:', this.teams);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  onSubmit(myForm: NgForm): void {
    if (myForm.valid) {
      this.isLoading = true; // Start loading indicator
      this.toastr.info('Updating performance...', 'Please wait', { disableTimeOut: true });

      // Add currentTeamId to the form values
      const formData = {
        ...myForm.value,
        team_id: this.currentTeamId
      };

      this.talentService.updatePerformance(this.performance.id, formData).subscribe(
        (response: any) => {
          if (response?.status) {
            this.toastr.clear();
            this.toastr.success('Performance updated successfully!', 'Success');
            this.dialogRef.close(response.data); // Close dialog with success data
          } else {
            this.toastr.clear();
            this.toastr.error('Failed to update performance. Please try again.', 'Error');
            console.error('Unexpected API response:', response);
          }
          this.isLoading = false; // Stop loading indicator
        },
        (error: any) => {
            this.toastr.clear();
          this.toastr.error('Error updating performance. Please try again later.', 'Error');
          console.error('Error submitting the form:', error);
          this.isLoading = false; // Stop loading indicator
        }
      );
    } else {
            this.toastr.clear();
      this.toastr.warning('Please fill out all required fields before submitting.', 'Warning');
    }
  }

  // Function to handle dynamic fetching of clubs based on search input
  onSearchTeams(): void {
    if (this.currentTeam.length < 2) {
      // Don't search until the user has typed at least 2 characters
      this.filterTeams = [];
      return;
    }

    this.talentService.searchTeams(this.currentTeam).subscribe(
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

  // Function to handle the selection of a club
  onSelectTeam(team: any): void {
    this.currentTeam = team.team_name +'-' +team.team_type; // Set the selected team's name to the input
    this.currentTeamId = team.id;
    this.filterTeams = []; // Clear the suggestion list
  }
}

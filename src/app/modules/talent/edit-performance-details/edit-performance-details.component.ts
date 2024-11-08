import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { NgForm } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<EditPerformanceDetailsComponent>,
    private talentService: TalentService,
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
    console.log('myForm submitted:', myForm.value);

    if (myForm.valid) {
      
      // Add currentTeamId to the form values
      const formData = {
        ...myForm.value,
        team_id: this.currentTeamId
      };
  
      this.talentService.updatePerformance(this.performance.id,formData).subscribe(
        (response: any) => {
          this.dialogRef.close(response.data);
        },
        (error: any) => {
          console.error('Error submitting the myForm:', error);
        }
      );
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

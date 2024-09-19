import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss'],
})
export class EditPersonalDetailsComponent implements OnInit {
  countries: string[] = ['United States', 'Germany', 'Canada', 'India'];
  leagueLevels: string[] = ['Amateur', 'Professional', 'Semi-Pro'];
  teams: any[] = [];
  selectedClub: string = '';
  user: any = {};
  loggedInUser: any = localStorage.getItem('userData');
  userId: any;

  // Declare individual properties for binding
  dateOfBirth: string = '';
  height: number = 0;
  heightUnit: string = '';
  weight: number = 0;
  weightUnit: string = '';
  contractStart: string = '';
  contractEnd: string = '';
  leagueLevel: string = '';
  placeOfBirth: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditPersonalDetailsComponent>,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.userId = this.loggedInUser.id;
    this.loadTeams();
    this.getUserProfile(this.userId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  loadTeams(): void {
    this.talentService.getTeams().subscribe(
      (response:any) => {
        if (response && response.status) {
          this.teams = response.data.clubs;
        }
      },
      (error:any) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  getUserProfile(userId: any) {
    this.talentService.getProfileData(userId).subscribe((response: any) => {
      if (response && response.status && response.data && response.data.user_data) {
        this.user = response.data.user_data;
  
        // Update component properties with user data
        if (this.user.meta) {
          this.dateOfBirth = this.user.meta.date_of_birth || '';
          this.height = this.user.meta.height || 0;
          this.heightUnit = this.user.meta.height_unit || '';
          this.weight = this.user.meta.weight || 0;
          this.weightUnit = this.user.meta.weight_unit || '';
          this.contractStart = this.user.meta.contract_start || '';
          this.contractEnd = this.user.meta.contract_end || '';
          this.leagueLevel = this.user.meta.league_level || '';
          this.placeOfBirth = this.user.meta.place_of_birth || '';
        }
      } else {
        console.error('Invalid API response structure:', response);
      }
    });
  }

  // Your form submit logic
  submitForm(form: NgForm) {
    console.log(form)
    if (form.valid) {
      const formData = new FormData();
      formData.append('user[first_name]', this.user.first_name);
      formData.append('user[last_name]', this.user.last_name);
      formData.append('user[current_club]', this.selectedClub);
      formData.append('user[nationality][]', this.user.nationality);
      formData.append('user[date_of_birth]', this.dateOfBirth); // Use the component property
      formData.append('user[place_of_birth]', this.placeOfBirth); // Use the component property
      formData.append('user[height]', this.height.toString());
      formData.append('user[height_unit]', this.heightUnit);
      formData.append('user[weight]', this.weight.toString());
      formData.append('user[weight_unit]', this.weightUnit);
      formData.append('user[contract_start]', this.contractStart);
      formData.append('user[contract_end]', this.contractEnd);
      formData.append('user[league_level]', this.leagueLevel);
      formData.append('user[foot]', this.user.foot);
      formData.append('user[international_player]', '1');
      formData.append('lang', 'en');

      this.talentService.updateUserProfile(formData).subscribe(
        (response:any) => {
          console.log('Form submitted successfully:', response);
          this.dialogRef.close(response.data);
        },
        (error:any) => {
          console.error('Error submitting the form:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}

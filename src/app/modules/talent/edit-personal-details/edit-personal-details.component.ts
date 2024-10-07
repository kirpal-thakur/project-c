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
  countries: any ;
  leagueLevels: string[] = ['Amateur', 'Professional', 'Semi-Pro'];
  teams: any[] = [];
  selectedClub: string = '';
  user: any = localStorage.getItem('userData');
  loggedInUser: any = localStorage.getItem('userData');
  userId: any;
  userNationalities : any;
  // Declare individual properties for binding
  dateOfBirth: string = '';
  height: number = 0;
  heightUnit: string = 'cm';
  weight: number = 0;
  weightUnit: string = 'kg';
  contractStart: string = '';
  contractEnd: string = '';
  leagueLevel: string = '';
  placeOfBirth: string = '';
  dominantFoot: string = 'Right'; // Set a default value for dominant foot
  currentClub: string = '';
  firstName: string = '';
  lastName: string = '';
  nationality: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<EditPersonalDetailsComponent>,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.user);
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.userId = this.loggedInUser.id;
    this.loadTeams();
    this.loadCountries();
    this.getUserProfile(this.userId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  loadTeams(): void {
    this.talentService.getClubs().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.teams = response.data.clubs;
          console.log(this.teams)
        }
      },
      (error: any) => {
        console.error('Error fetching teams:', error);
      }
    );
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

  getUserProfile(userId: any) {
    this.talentService.getProfileData(userId).subscribe((response: any) => {
      if (response && response.status && response.data && response.data.user_data) {
        this.user = response.data.user_data;

        // Update component properties with user data
        if (this.user.meta) {
          this.dateOfBirth = this.user.meta.date_of_birth || '';
          this.height = this.user.meta.height || 0;
          this.heightUnit = this.user.meta.height_unit || 'cm';
          this.weight = this.user.meta.weight || 0;
          this.weightUnit = this.user.meta.weight_unit || 'kg';
          this.contractStart = this.user.meta.contract_start || '';
          this.contractEnd = this.user.meta.contract_end || '';
          this.leagueLevel = this.user.meta.league_level || '';
          this.placeOfBirth = this.user.meta.place_of_birth || '';
          this.dominantFoot = this.user.meta.foot || 'Right';
          this.currentClub = this.user.current_club || '';
          this.firstName = this.user.first_name || '';
          this.lastName = this.user.last_name || '';
          this.userNationalities = JSON.parse(this.user.user_nationalities);
          this.nationality = this.userNationalities[0];
        }
      } else {
        console.error('Invalid API response structure:', response);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();

       // Append each field to FormData
      formData.append('user[current_club]', this.currentClub);
      formData.append('user[date_of_birth]', this.dateOfBirth);
      formData.append('user[place_of_birth]', this.placeOfBirth);
      formData.append('user[height]', this.height.toString());
      formData.append('user[height_unit]', this.heightUnit);
      formData.append('user[weight]', this.weight.toString());
      formData.append('user[weight_unit]', this.weightUnit);
      formData.append('user[contract_start]', this.contractStart);
      formData.append('user[contract_end]', this.contractEnd);
      formData.append('user[league_level]', this.leagueLevel);
      formData.append('user[foot]', this.dominantFoot);
      formData.append('user[first_name]', this.firstName);
      formData.append('user[last_name]', this.lastName);
      formData.append('user[userNationalities]', this.nationality);
      formData.append('lang', 'en');

      this.talentService.updateUserProfile(formData).subscribe(
        (response: any) => {
          console.log('Form submitted successfully:', response);
          this.dialogRef.close(response.data);
        },
        (error: any) => {
          console.error('Error submitting the form:', error);
        }
      );
    }
  }
}

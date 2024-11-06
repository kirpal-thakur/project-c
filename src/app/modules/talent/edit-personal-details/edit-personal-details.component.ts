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
  countries: any;
  leagueLevels: string[] = ['Amateur', 'Professional', 'Semi-Pro'];
  filteredClubs: any[] = [];  // To store filtered clubs based on search
  selectedClub: string = '';
  user: any = localStorage.getItem('userData');
  loggedInUser: any = localStorage.getItem('userData');
  userId: any;
  userNationalities: any;
  
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
  currentClubId: any;
  userData:any

  constructor(
    public dialogRef: MatDialogRef<EditPersonalDetailsComponent>,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userData = {...this.data};
    
    this.user = JSON.parse(this.user);
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.userId = this.loggedInUser.id;
    this.loadCountries();
    this.getUserProfile(this.userId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  
  // Function to handle dynamic fetching of clubs based on search input
  onSearchClubs(): void {
    if (this.currentClub.length < 2) {
      // Don't search until the user has typed at least 3 characters
      this.filteredClubs = [];
      return;
    }
  
    this.talentService.searchClubs(this.currentClub).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.filteredClubs = response.data.clubs;  // Update the list of filtered clubs based on search
          console.log('Filtered Clubs:', this.filteredClubs);
        }
      },
      (error: any) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }
  


  // Function to handle the selection of a club
  onSelectClub(club: any): void {
    this.currentClub = club.club_name;  // Set the selected club's name to the input
    this.currentClubId = club.id;  // Set the selected club's name to the input
    this.filteredClubs = [];  // Clear the suggestion list
  }

  loadCountries(): void {
    this.talentService.getCountries().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.countries = response.data.countries;
        }
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  getUserProfile(userId: any) {
    
      if (this.userData ) {
        this.user = this.userData;

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
        console.error('Invalid API this.userData structure:', this.userData);
      }
      
  }

  onSubmit(form: NgForm) {
    console.log(this.nationality)
    if (form.valid) {
      const formData = new FormData();
      
      formData.append('user[current_club]', this.currentClubId);
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
      formData.append('user[nationality][]', this.nationality);
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

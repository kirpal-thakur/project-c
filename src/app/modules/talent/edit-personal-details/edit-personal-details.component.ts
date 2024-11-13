import { Component, ElementRef, Inject, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { FormControl, NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { catchError, Observable, of, tap,fromEvent } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { ToastrService } from 'ngx-toastr';

const moment = _rollupMoment || _moment;


// Declare google globally to avoid TypeScript errors
declare const google: any;

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPersonalDetailsComponent implements OnInit {
  
  @ViewChild('placeOfBirthInput') placeOfBirthInput!: ElementRef;
  placeSuggestions: any[] = [];
  readonly date = new FormControl(moment());

  countries: any;
  leagueLevels: string[] = ['Amateur', 'Professional', 'Semi-Pro'];
  filteredClubs: any[] = [];  // To store filtered clubs based on search
  selectedClub: string = '';
  user: any = localStorage.getItem('userData');
  loggedInUser: any = localStorage.getItem('userData');
  userId: any;
  userNationalities: any;
  playerClub: any = "";

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
  nationality: string[] = [];  // Ensure nationality is initialized as an array
  currentClubId: any;
  userData:any
  playerClubsListing:any;
  takenBy:any;

  constructor(
    public dialogRef: MatDialogRef<EditPersonalDetailsComponent>,
    private talentService: TalentService,
    private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  countriesLoaded: boolean = false;
  profileLoaded: boolean = false;
  
  ngOnInit(): void {
    this.userData =this.user = { ...this.data };
  
    // this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.loggedInUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userId = this.loggedInUser.id;
  
    // Fetch countries first, then get user profile
    this.loadCountries().subscribe(() => {
      this.getUserProfile(this.userId);
      this.getClubsForPlayer();
    });
    
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
      this.currentClub = this.user.pre_current_club_name || '';
      this.firstName = this.user.first_name || '';
      this.lastName = this.user.last_name || '';
      this.userNationalities = JSON.parse(this.user.user_nationalities) || [];
      
      // Ensure userNationalities is parsed correctly as an array of IDs only
      this.userNationalities = JSON.parse(this.user.user_nationalities || '[]');
      this.nationality = Array.isArray(this.userNationalities) ? this.userNationalities.map((nation: any) => nation.country_id) : [];

      if (this.user.meta && this.user.meta.pre_club_id) {
        this.currentClubId = this.user.meta.pre_club_id;
      }
    }
    
  }
  
  ngAfterViewInit(): void {
    this.initGooglePlacesAutocomplete();
  }

  initGooglePlacesAutocomplete(): void {
    
    if (this.placeOfBirthInput) {
      const autocomplete = new google.maps.places.Autocomplete(this.placeOfBirthInput.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: { country: 'us' }
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
          this.placeOfBirth = place.formatted_address || '';
        }
      });
    }
    
  }
  
  // ngAfterViewInit(): void {
  //   this.setupPlaceAutocomplete();
  // }

  // setupPlaceAutocomplete() {
  //   fromEvent(this.placeOfBirthInput.nativeElement, 'input')
  //     .pipe(
  //       debounceTime(300),          // Wait for 300ms pause in events
  //       distinctUntilChanged(),      // Only emit if the value has changed
  //       switchMap((event: any) => {
  //         const input = event.target.value;
  //         return this.authService.getPlacePredictions(input);
  //       })
  //     )
  //     .subscribe((response: any) => {
  //       this.placeSuggestions = response.predictions || [];
  //     });
  // }

  onSelectSuggestion(place: any): void {
    this.placeOfBirthInput.nativeElement.value = place.description;
    this.placeSuggestions = [];  // Clear suggestions
  }

  // After loading, mark countries as loaded and check if both are ready
  loadCountries(): Observable<any> {
    return this.talentService.getCountries().pipe(
      tap((response: any) => {
        if (response && response.status) {
          this.countries = response.data.countries;
        }
      }),
      catchError(error => {
        console.error('Error fetching countries:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  getClubsForPlayer(){
    this.talentService.getClubsForPlayer().subscribe(
      response => {
        if(response.status){
          this.playerClubsListing = response.data.clubs;

          //check taken by status to show teams dropdown

          let index = this.playerClubsListing.findIndex((x:any) => x.id == this.data.meta.pre_club_id);
          if(this.playerClubsListing[index]?.is_taken == "yes"){            
            this.takenBy = this.playerClubsListing[index].taken_by;            
          }
          
        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );
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

  getUserProfile(userId: any) {
    if (this.userData) {
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
        this.currentClub = this.user.pre_current_club_name || '';
        this.firstName = this.user.first_name || '';
        this.lastName = this.user.last_name || '';
        this.userNationalities = JSON.parse(this.user.user_nationalities) || [];
        
        // Ensure userNationalities is parsed correctly as an array of IDs only
        this.userNationalities = JSON.parse(this.user.user_nationalities || '[]');
        this.nationality = Array.isArray(this.userNationalities) ? this.userNationalities.map((nation: any) => nation.country_id) : [];

        if (this.user.meta && this.user.meta.pre_club_id) {
          this.currentClubId = this.user.meta.pre_club_id;
        }
      }
    } else {
      console.error('Invalid API this.userData structure:', this.userData);
    }
  }
  
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Enable loading state and notify user
      this.toastr.info('Submitting your profile...', 'Please wait');

      const formData = new FormData();
      
      // Handling the `current_club` and `pre_club_id`
      let index = this.playerClubsListing.findIndex((x: any) => x.id === this.currentClubId);
      if (this.playerClubsListing[index]?.is_taken === "yes") {
        this.takenBy = this.playerClubsListing[index].taken_by;
        formData.append('user[pre_club_id]', this.currentClubId);
        formData.append('user[current_club]', this.takenBy);
      } else {
        formData.append('user[pre_club_id]', this.currentClubId);
      }

      // Append remaining form fields
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

      // Append nationality array
      this.nationality.forEach((nation: any) => {
        formData.append('user[nationality][]', nation);
      });

      formData.append('lang', 'en');

      // API call for submitting form data
      this.talentService.updateUserProfile(formData).subscribe(
        (response: any) => {
          if (response?.status) {
            this.toastr.success('Profile updated successfully!', 'Success');
            this.dialogRef.close(response.data);
          } else {
            this.toastr.error('Unexpected error occurred. Please try again.', 'Submission Failed');
            console.error('API response error:', response);
          }
        },
        (error: any) => {
          this.toastr.error('Failed to submit profile. Please try again.', 'Error');
          console.error('Error submitting the form:', error);
        },
      );
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Form Incomplete');
    }
  }
  
  onDateChange(event: MatDatepickerInputEvent<Date>, type:any): void {

    const selectedDate = event.value;
    let date = this.formatDate(selectedDate);

    if(type == 'dob'){
      this.dateOfBirth = date;
    }

  }

  formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}

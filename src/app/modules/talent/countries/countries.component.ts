import { Component } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCountryComponent } from './add-country/add-country.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']  // Corrected here
})
export class CountriesComponent {
  countries: any ;
  selectedCategory: string = 'all';
  countriesPerPage: number = 4;
  currentPage: number = 0;
  flag_path:any;
  filteredImages: any[] = [];  // Fixed: explicitly set as an array
  paginatedImages: any[] = [];
  defaultCountry : any;
  loggedInUser:any = localStorage.getItem('userData');
  premium : any =[];
  country: any=[];
  booster: any=[];
  demo: any=[];

  constructor( private talentService: TalentService ,public dialog: MatDialog)  {}

  ngOnInit() {
    this.loggedInUser = JSON.parse(this.loggedInUser);
    console.log(this.loggedInUser)
    this.loadCountries();
  }
  
  loadCountries(): void {
    this.talentService.getDomains().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.countries = response.data.domains;
          this.flag_path = response.data.flag_path;
          console.log('countries',this.countries)
        }
      },
      (error: any) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  selectedCountries: string[] = []; // Store selected country names here

  toggleCountrySelection(country: any) {
    const index = this.selectedCountries.indexOf(country.location);
    if (index === -1) {
      this.selectedCountries.push(country.location); // Select country if not selected
    } else {
      this.selectedCountries.splice(index, 1); // Deselect if already selected
    }
    // console.log('countries',this.selectedCountries)
    this.addCountryPopup(country);
  }

  addCountryPopup(country:any){
    const dialogRef = this.dialog.open(AddCountryComponent, {
      width: '600px',
      data: { 
        country: country ,
      }
    });
  }

  isSelectedCountry(country: any): boolean {
    return this.selectedCountries.includes(country.location);
  }

  
  // Fetch purchases from API with pagination parameters
  getUserPlans(): void {
    this.talentService.getUserPlans().subscribe(
      response => {
        if (response?.status && response?.data) {
          const userPlans = response.data.packages;

          // Use optional chaining and nullish coalescing to handle undefined/null
          this.premium = Array.isArray(userPlans?.premium) && userPlans.premium.length > 0 ? userPlans.premium : [];
          this.demo = Array.isArray(userPlans?.demo) && userPlans.demo.length > 0 ? userPlans.demo : [];
          this.booster = Array.isArray(userPlans?.booster) && userPlans.booster.length > 0 ? userPlans.booster : [];

          // Assign the last index of premium and booster arrays
          this.premium = this.premium.length > 0 ? this.premium[0] : null;
          this.booster = this.booster.length > 0 ? this.booster[0] : null;
          this.demo = this.demo.length > 0 ? this.demo[0] : null;

          this.country = userPlans?.country || ''; // Default to empty string if country is undefined

          console.log('userPlans', userPlans);
        } else {
          console.error('Invalid API response:', response);
        }
      },
      error => {
        console.error('Error fetching user purchases:', error);
      }
    );
  }
}

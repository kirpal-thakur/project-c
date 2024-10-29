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

  constructor( private talentService: TalentService ,public dialog: MatDialog)  {}

  ngOnInit() {
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
}

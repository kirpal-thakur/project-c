import { Component } from '@angular/core';
import { TalentService } from '../../../services/talent.service';

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

  filteredImages: any[] = [];  // Fixed: explicitly set as an array
  paginatedImages: any[] = [];

  constructor(private talentService: TalentService) {}

  ngOnInit() {
    this.loadCountries();
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

  selectedCountries: string[] = []; // Store selected country names here

  toggleCountrySelection(country: any) {
    const index = this.selectedCountries.indexOf(country.country_name);
    if (index === -1) {
      this.selectedCountries.push(country.country_name); // Select country if not selected
    } else {
      this.selectedCountries.splice(index, 1); // Deselect if already selected
    }
    console.log('countries',this.selectedCountries)

  }

  isSelectedCountry(country: any): boolean {
    return this.selectedCountries.includes(country.country_name);
  }
}

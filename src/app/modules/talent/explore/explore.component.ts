import { Component, ViewChild, OnInit } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  players: any[] = [];
  pageSize = 15; // Default page size
  totalItems: number = 0;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20]; // Added page size options
  userNationalities: any = [];
  nation: any = [];  
  ageRange: number[] = [];
  roles: any = [
    { role: "Clubs",   id: 2 },
    { role: "Scouts",  id: 3 },
    { role: "Talent",  id: 4 },
    { role: "League" , id: 5 }
  ];
  positions: any[] = [];
  countries: any;
  clubs : any;
  leagues : any;

  // Filters
  selectedRole: number | null = null;
  selectedCountry: number | null = null;
  selectedPositions: number[] = [];
  selectedAge: number | null = null;
  selectedFoot: string | null = null;
  selectedTopSpeed: string | null = null;
  selectedLeague: number | null = null;
  selectedClub: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private talentService: TalentService) { }

  ngOnInit(): void {
    this.loadPositions();
    this.loadLeagues();
    this.loadClubs();
    this.loadCountries();
    this.getUserFavorites();
    this.ageRange = Array.from({ length: 50 - 15 + 1 }, (_, i) => i + 15);
  }

  getUserFavorites() {
    const pageIndex = this.currentPage;
    const pageSize = this.pageSize;

    // Collect filters
    let params: any = {
      offset: pageIndex * pageSize,
      limit: pageSize,
      role: this.selectedRole,
      country: this.selectedCountry,
      positions: this.selectedPositions,
      age: this.selectedAge,
      foot: this.selectedFoot,
      topSpeed: this.selectedTopSpeed,
      league: this.selectedLeague,
      club: this.selectedClub
    };

    // Clean null or empty filters from params
    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === undefined || params[key]?.length === 0) {
        delete params[key];
      }
    });

    // Call the service to get filtered data
    this.talentService.getExploresData(params).subscribe((response) => {
      if (response && response.status && response.data) {
        this.players = response.data.userData.users;
        this.totalItems = response.data.userData.totalCount;
      }
    });
  }

  // Event handler for page change in paginator
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUserFavorites();
  }

  // Apply filter function to refresh the data when filters change
  applyFilter() {
    this.currentPage = 0; // Reset to first page when applying new filters
    this.getUserFavorites();
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

  loadPositions(): void {
    this.talentService.getPositions().subscribe(
      (response: any) => {
        if (response.status) {
          this.positions = response.data.positions;
        }
      },
      (error: any) => {
        console.error('Error fetching positions:', error);
      }
    );
  }

  loadLeagues(): void {
    this.talentService.getLeagues().subscribe(
      (response: any) => {
        if (response.status) {
          this.leagues = response.data.leagues;
        }
      },
      (error: any) => {
        console.error('Error fetching leagues:', error);
      }
    );
  }

  loadClubs(): void {
    this.talentService.getClubs().subscribe(
      (response: any) => {
        if (response.status) {
          this.clubs = response.data.clubs;
        }
      },
      (error: any) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }

  

  // Get the nationality flag (assuming userNationalities is a JSON string)
  getNationality(userNationalities: string): string {
    const parsedNationalities = JSON.parse(userNationalities);
    return parsedNationalities.length > 0 ? parsedNationalities[0].flag_path : '';
  }

}

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private talentService: TalentService) { }

  ngOnInit(): void {

    this.loadPositions();
    this.loadLeagues();
    this.loadClubs();
    this.loadCountries();
    this.getUserFavorites();

    // Populate ageRange with numbers from 15 to 50
    this.ageRange = Array.from({ length: 50 - 15 + 1 }, (_, i) => i + 15);
    
  }

  // Fetch user favorites with pagination
  getUserFavorites() {
    const pageIndex = this.currentPage;
    const pageSize = this.pageSize;

    let params: any = {
      offset: pageIndex * pageSize,
      limit: pageSize
    };

    // Call the service to get explore data
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

  // Get the nationality flag (assuming userNationalities is a JSON string)
  getNationality(userNationalities: string): string {
    const parsedNationalities = JSON.parse(userNationalities);
    return parsedNationalities.length > 0 ? parsedNationalities[0].flag_path : '';
  }

  
  loadCountries(): void {
    this.talentService.getCountries().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.countries = response.data.countries;
          console.log('Countries:', this.countries);
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
          console.log('Positions:', this.positions);
        } else {
          console.error('No data found');
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
          console.log('leagues:', this.leagues);
        } else {
          console.error('No data found');
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
          console.log('clubs:', this.clubs);
        } else {
          console.error('No data found');
        }
      },
      (error: any) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }

}

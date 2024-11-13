import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
  selectedPositions: any ;
  selectedAge: any;
  selectedFoot: any;
  selectedTopSpeed: string | null = null;
  selectedLeague: number | null = null;
  selectedClub: number | null = null;
  loggedInUser:any = localStorage.getItem('userData');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Filters and UI variables (other code omitted for brevity)
  viewsTracked: { [profileId: string]: { viewed: boolean, clicked: boolean } } = {}; // Track view and click per profile

  constructor(
    private talentService: TalentService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    
    this.loggedInUser = JSON.parse(this.loggedInUser);
    
    this.loadPositions();
    this.loadLeagues();
    this.loadClubs();
    this.loadCountries();
    this.getUsers();

    // Populate ageRange with numbers from 15 to 50
    this.ageRange = Array.from({ length: 50 - 15 + 1 }, (_, i) => i + 15);
    // Initialize viewsTracked from sessionStorage
    this.loadTrackedViews();
  }

  private loadTrackedViews() {
    const views = sessionStorage.getItem('viewsTracked');
    if (views) {
      this.viewsTracked = JSON.parse(views);
    }
  }

  private saveTrackedViews() {
    sessionStorage.setItem('viewsTracked', JSON.stringify(this.viewsTracked));
  }


  private trackBoostedProfileViews(players: any[]) {
    // Collect all profile IDs that need to be tracked
    const profilesToTrack = players
      .filter(player => player.package_name === 'Booster')
      .filter(profile => !this.viewsTracked[profile.id]?.viewed && this.loggedInUser.id !== profile.id)
      .map(profile => profile.id); // Collect profile IDs into an array
  
    // Check if we have profiles to track
    if (profilesToTrack.length > 0) {
      // Send the array of profile IDs in a single API call
      this.talentService.trackProfiles(this.loggedInUser.id, profilesToTrack, 'view').subscribe({
        next: () => {
          console.log(`Views tracked for profiles: ${profilesToTrack.join(', ')}`);
          
          // Update the local viewsTracked object
          profilesToTrack.forEach(profileId => {
            this.viewsTracked[profileId] = { ...this.viewsTracked[profileId], viewed: true };
          });
  
          // Save the updated viewsTracked state
          this.saveTrackedViews();
        },
        error: (error) => console.error('Error tracking profile views', error)
      });
    }
  }
  
  // Track profile click only once per session
  private trackProfileClick(profileId: number) {
    const id: number[] = [profileId];  // Create an array of profileId

    if (!this.viewsTracked[profileId]?.clicked) {
      this.talentService.trackProfiles(this.loggedInUser.id, id, 'click').subscribe({
        next: () => {
          console.log(`Click tracked for profile ${profileId}`);
          this.viewsTracked[profileId] = { ...this.viewsTracked[profileId], clicked: true };
          this.saveTrackedViews();  // Save the updated viewsTracked
        },
        error: (error) => console.error('Error tracking profile click', error)
      });
    }
  }

  exploreUser(slug: string, id: number): void {
    this.trackProfileClick(id); // Track the click before navigation
    const pageRoute = 'view/' + slug.toLowerCase();
    this.router.navigate([pageRoute, id]);
  }

  // Event handler for page change in paginator
  getUsers() {
    const pageIndex = this.currentPage;
    const pageSize = this.pageSize;
  
    // Construct the params object with complex whereClause and metaQuery logic
    let params: any = {
      offset: pageIndex * pageSize,
      limit: pageSize,
      whereClause: {
        role: this.selectedRole,
        user_domain: this.selectedCountry,
        age: this.selectedAge,
        position : this.selectedPositions
      },
      metaQuery: [],
    };
  
    // Add other filters if they are selected
    if (this.selectedFoot) {
      params.metaQuery.push({
        meta_key: 'foot',
        meta_value: this.selectedFoot,
        operator: '='
      });
    }
  
    if (this.selectedTopSpeed) {
      params.metaQuery.push({
        meta_key: 'top_speed',
        meta_value: this.selectedTopSpeed,
        operator: '='
      });
    }
  
    if (this.selectedLeague) {
      params.metaQuery.push({
        meta_key: 'league',
        meta_value: this.selectedLeague,
        operator: '='
      });
    }
  
    if (this.selectedClub) {
      params.metaQuery.push({
        meta_key: 'club',
        meta_value: this.selectedClub,
        operator: '='
      });
    }
  
    // Clean null or empty filters from whereClause
    Object.keys(params.whereClause).forEach(key => {
      if (params.whereClause[key] === null || params.whereClause[key] === undefined || params.whereClause[key]?.length === 0) {
        delete params.whereClause[key];
      }
    });
  
    // Call the service to get filtered data
    this.talentService.getExploresData(params).subscribe((response) => {
      if (response && response.status && response.data) {
        this.players = response.data.userData.users;
        this.totalItems = response.data.userData.totalCount;

        this.trackBoostedProfileViews(this.players);

        setTimeout(() => this.cdr.detectChanges(), 0);
      }
    });
  }
  
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  // Apply filter function to refresh the data when filters change
  applyFilter() {
    this.currentPage = 0; // Reset to first page when applying new filters
    this.getUsers();
  }

  loadCountries(): void {
    this.talentService.getDomains().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.countries = response.data.domains;
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
        } else {
          console.error('No data found');
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

  getSelectedFilters() {

    const filters = [];
    if (this.selectedRole) {
      filters.push({ label: 'Category', value: this.selectedRole });
    }
    if (this.selectedCountry) {
      let getCountryById = this.countries.find((val: any) => {
        return val.id == this.selectedCountry;
      });
      filters.push({ label: 'Country', value: getCountryById.location });
    }
    if (this.selectedPositions) {
      let positionLabel = (this.selectedPositions.length > 0) ? 'Pos' : '';
      filters.push({ label: positionLabel, value: this.selectedPositions.join(', ') });
    }
    if (this.selectedAge) {
      let ageLabel = (this.selectedAge.length > 0) ? 'Age' : '';
      filters.push({ label: ageLabel, value: this.selectedAge.join(', ') });
    }
    if (this.selectedFoot) {
      let footLabel = (this.selectedFoot.length > 0) ? 'Foot' : '';
      filters.push({ label: footLabel, value: this.selectedFoot.join(', ') });
    }
    if (this.selectedTopSpeed) {
      let selectedTopSpeed:any = {
        '15': '15-20 Km/hr',
        '20': '20-25 Km/hr',
        '25': '25-30 Km/hr',
        '30': '30-35 Km/hr',
        '35': '35-40 Km/hr',
      }
      filters.push({ label: 'Top Speed', value: selectedTopSpeed[this.selectedTopSpeed] });
    }
    if (this.selectedLeague) {
      filters.push({ label: 'League', value: this.selectedLeague });
    }
    if (this.selectedClub) {
      filters.push({ label: 'Club', value: this.selectedClub });
    }
    // Repeat for other filters
    return filters;
  }

  // Example method to remove a filter
  removeFilter( label: string ) {
    // Logic to remove the selected filter and update the filter array
    switch (label) {
      case 'Category':
        this.selectedRole = null;
        break;
      case 'Country':
        this.selectedCountry = null;
        break;
      case 'Pos':
        this.selectedPositions = null;
        break;
      case 'Age':
        this.selectedAge = null;
        break;
      case 'Foot':
        this.selectedFoot = null;
        break;
      case 'Top Speed':
        this.selectedTopSpeed = null;
        break;
      case 'League':
        this.selectedLeague = null;
        break;
      case 'Club':
        this.selectedClub = null;
        break;
    }

    // Refresh data after removing filter
    this.getUsers(); 
  }
  
  // Generic method to get names by ID
  getNameById(label: string, id: string): string {
    switch (label) {
      case 'Country':
        const country = this.countries.find((count: any) => count.id === id);
        return country ? country.country_name : id;

      case 'Category':
        const role = this.roles.find((pos: any) => pos.id === id);
        return role ? role.role : id;

      case 'Pos':
        // Handle multiple position IDs
        const positionIds = id.split(",").map(position => position.trim());
        const positionNames = positionIds
          .map(posId => {
            const position = this.positions.find(pos => pos.id === posId);
            return position ? position.position : posId; // Use the ID if not found
          });
        return positionNames.join(", "); // Return a comma-separated string of positions

      case 'League':
        const league = this.leagues.find((pos: any) => pos.id === id);
        return league ? league.league_name : id;

      case 'Club':
        const club = this.clubs.find((pos: any) => pos.id === id);
        return club ? club.club_name : id;

      default:
        return id; // Return ID as fallback
    }
  }

  // Method to check if the label is empty
  empty(label: string): boolean {
    return !label || label.trim() === '';
  }

}

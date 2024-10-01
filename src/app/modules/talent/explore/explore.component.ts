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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: TalentService) { }

  ngOnInit(): void {
    this.getUserFavorites();
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
    this.userService.getExploresData(params).subscribe((response) => {
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
}

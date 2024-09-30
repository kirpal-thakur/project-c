import { Component, ViewChild, OnInit } from '@angular/core';
import { TalentService } from '../../../services/talent.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; // Import PageEvent for paginator

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  players: any[] = []; // List of players data
  pageSize = 15; // Default page size
  totalItems: number = 0; // Total number of items (players)
  currentPage: number = 0; // Current page index
  totalPages: number = 0; // Total number of pages
  userNationalities: any = [];
  nation: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for paginator

  constructor(private userService: TalentService) { }

  ngOnInit(): void {
    this.getUserFavorites(); // Initial data load
  }

  // Fetch user favorites with pagination
  getUserFavorites() {
    const pageIndex = this.currentPage; // Current page index
    const pageSize = this.pageSize; // Current page size

    let params: any = {
      offset: pageIndex * pageSize, // Calculate the offset based on the page
      limit: pageSize // Limit is the page size
    };

    // Call the service to get explore data
    this.userService.getExploresData(params).subscribe((response) => {
      if (response && response.status && response.data) {
        this.players = response.data.userData.users; // Update players list
        this.totalItems = response.data.userData.totalCount; // Total number of items
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Calculate total pages
      }
    });
  }

  // Get the nationality flag (assuming userNationalities is a JSON string)
  getNationality(userNationalities: string): string {
    const parsedNationalities = JSON.parse(userNationalities);
    return parsedNationalities.length > 0 ? parsedNationalities[0].flag_path : '';
  }

  // Event handler for page change in paginator
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size if changed
    this.getUserFavorites(); // Fetch data based on new pagination settings
  }

  // Move to the previous page
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--; // Decrement the current page
      this.getUserFavorites(); // Fetch the updated data
    }
  }

  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++; // Increment the current page
      this.getUserFavorites(); // Fetch the updated data
    }
  }
}

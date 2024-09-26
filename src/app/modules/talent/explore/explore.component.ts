import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  
    players: any = [];
    pageSize = 15;
  
    currentPage = 1;
    totalPages = 0;
  
    ngOnInit() {
      this.calculateTotalPages();
    }
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  
    private calculateTotalPages() {
      this.totalPages = Math.ceil(this.players.length / this.pageSize);
    }
    
}

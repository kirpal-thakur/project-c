import { Component, OnInit } from '@angular/core';

interface Player {
  name: string;
  image: string;
}

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  selectedTab: 'talent' | 'club' | 'scouts' = 'talent'; // Updated to include 'scouts'
  currentPage: number = 1;
  itemsPerPage: number = 5; // Default to 5 items per page on refresh
  number: number = 12; // Defined the 'number' property
  activeAccordionIndex = 1;
  totalPagesCount: number = 12;

  players: Player[] = [
    { name: 'Zidane', image: './assets/images/ziddane.png' },
    { name: 'Ronaldinho Gaúcho', image: './assets/images/Ronaldinho Gaúcho.png' },
    { name: 'Gabriel Jesus', image: './assets/images/Gabriel Jesus.png' },
    { name: 'Messi', image: './assets/images/Messi.png' },
    { name: 'Cristiano Ronaldo', image: './assets/images/cristo-ronaldo.png' },
    { name: 'Jermain Defoe', image: './assets/images/Jermain Defoe.png' },
    { name: 'Mohamed Salah', image: './assets/images/mohamad.png' },
    { name: 'Bukayo Saka', image: './assets/images/Bukayo Saka.png' },
    { name: 'Kevin De Bruyne', image: './assets/images/kevin.png' },
    { name: 'Jamie Vardy', image: './assets/images/jammie.png' },
    { name: 'Aaron Ramsey', image: './assets/images/aaron.png' },
    { name: 'Adam Lallana', image: './assets/images/Adam Lallana.png' },
    { name: 'Harry Kane', image: './assets/images/Harry Kane.png' },
    { name: 'Kasper Schmeichel', image: './assets/images/kasper.png' },
    { name: 'Elton Prince Morina', image: './assets/images/Elton Prince Morina.png' },
    { name: 'Jamie Vardy', image: './assets/images/jammie.png' },
  ];

  clubPlayers: Player[] = [{ name: 'Gabriel Jesus', image: './assets/images/Gabriel Jesus.png' },
  { name: 'Messi', image: './assets/images/Messi.png' },
  { name: 'Cristiano Ronaldo', image: './assets/images/cristo-ronaldo.png' },
  { name: 'Jermain Defoe', image: './assets/images/Jermain Defoe.png' },
  { name: 'Mohamed Salah', image: './assets/images/mohamad.png' },
  { name: 'Bukayo Saka', image: './assets/images/Bukayo Saka.png' },
  { name: 'Kevin De Bruyne', image: './assets/images/kevin.png' },
  { name: 'Jamie Vardy', image: './assets/images/jammie.png' },
  { name: 'Aaron Ramsey', image: './assets/images/aaron.png' },
  { name: 'Adam Lallana', image: './assets/images/Adam Lallana.png' },
  { name: 'Harry Kane', image: './assets/images/Harry Kane.png' },
  { name: 'Kasper Schmeichel', image: './assets/images/kasper.png' },
  { name: 'Elton Prince Morina', image: './assets/images/Elton Prince Morina.png' },
  { name: 'Jamie Vardy', image: './assets/images/jammie.png' },
  ];

  scoutsPlayers: Player[] = [

    { name: 'Cristiano Ronaldo', image: './assets/images/cristo-ronaldo.png' },
    { name: 'Jermain Defoe', image: './assets/images/Jermain Defoe.png' },
    { name: 'Mohamed Salah', image: './assets/images/mohamad.png' },
    { name: 'Bukayo Saka', image: './assets/images/Bukayo Saka.png' },
    { name: 'Kevin De Bruyne', image: './assets/images/kevin.png' },
    { name: 'Jamie Vardy', image: './assets/images/jammie.png' },
    { name: 'Aaron Ramsey', image: './assets/images/aaron.png' },
    { name: 'Adam Lallana', image: './assets/images/Adam Lallana.png' },
    { name: 'Harry Kane', image: './assets/images/Harry Kane.png' },
    { name: 'Kasper Schmeichel', image: './assets/images/kasper.png' },
    { name: 'Elton Prince Morina', image: './assets/images/Elton Prince Morina.png' },
    { name: 'Jamie Vardy', image: './assets/images/jammie.png' },];

  adVisible: boolean[] = [true, true, true, true, true];

  ngOnInit() {
    // Set itemsPerPage to 5 when the component initializes or refreshes
    this.itemsPerPage = 5;
  }

  selectTab(tab: 'talent' | 'club' | 'scouts'): void {
    this.selectedTab = tab;
    this.currentPage = 1;
  }

  // totalPages(): number {
  //   const totalItems = this.players.length;
  //   return Math.ceil(totalItems / this.itemsPerPage); // Calculate total pages based on items per page
  // }

   // Calculate total pages (currently it's fixed to 12 in this example)
   totalPages(): number {
    return this.totalPagesCount;
  }

 // Get the range of pages to display
  pagesToShow(): number[] {
    const total = this.totalPages();
    const pages: number[] = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    // If the range doesn't include 5 pages, adjust the start page
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

 

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
 // Go to next page
 nextPage() {
  if (this.currentPage < this.totalPages()) {
    this.currentPage++;
  }
}

// Go to a specific page
goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages()) {
    this.currentPage = page;
  }
}

  closeAd(index: number) {
    this.adVisible[index] = false;
  }

  getNumbers(): number[] {
    return [5, 10, 20, 50, 100]; // List of options for "items per page"
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to the first page whenever the items per page is changed
  }

  getCurrentPlayers(): Player[] {
    let playersToShow: Player[] = [];
    
    if (this.selectedTab === 'scouts') {
      playersToShow = this.scoutsPlayers;
    } else if (this.selectedTab === 'club') {
      playersToShow = this.clubPlayers;
    } else {
      playersToShow = this.players;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return playersToShow.slice(startIndex, startIndex + this.itemsPerPage);
  }

}



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
  selectedTab: 'talent' | 'club' = 'talent';
  currentPage: number = 1;
  itemsPerPage: number = 10; // Adjust items per page as needed
  number: number = 12; // Initialize this with a default value

  activeAccordionIndex = 1;

  setActiveAccordion(index: number): void {
    this.activeAccordionIndex = index;
  }

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
    { name: 'Jamie Vardy', image: './assets/images/jammie.png' }
  ];

  adVisible: boolean[] = [true, true, true, true, true]; // Array to manage ad visibility

  ngOnInit() {
    // Initialization logic here
  }

  selectTab(tab: 'talent' | 'club'): void {
    this.selectedTab = tab;
  }
  totalPages(): number {
        return 12; // Always return 12 pages
      }

  // totalPages(): number {
  //   return Math.ceil(this.players.length / this.itemsPerPage); // Adjust total pages based on items per page
  // }

  pagesToShow(): number[] {
    const total = this.totalPages();
    const pages: number[] = [];
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(total, startPage + 4);

    // Ensure we have 5 pages in view
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
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

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  getNumbers(): number[] {
    return Array.from({ length: 20 }, (_, i) => i + 1);
  }

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

  getCurrentPlayer(): Player | null {
    const index = (this.currentPage - 1) * this.itemsPerPage;
    return this.players[index] || null; // Return the player for the current page
  }
}

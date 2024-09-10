import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']  // Fixed styleUrl to styleUrls
})
export class IndexComponent {
  // Owl Carousel options
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000, // 3000ms = 3 seconds
    autoplaySpeed: 500,    // Duration of the transition between slides (in milliseconds)
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      840: {
        items: 4
      },
      1400: {
        items: 6
      }
    }
  };

  // Default selected content and category
  selectedContent: string = 'Sign-up & Profile Creation';
  selectedCategory: string = 'Talent'; // Default to Talent

  // Method to set the selected content
  showContent(content: string): void {
    this.selectedContent = content;
  }

  // Method to check if content is active
  isActive(content: string): boolean {
    return this.selectedContent === content;
  }

  // Method to set the selected category and reset content
  showCategory(category: string): void {
    this.selectedCategory = category;
    this.resetContentForCategory(category);
  }

  // Reset content based on selected category
  private resetContentForCategory(category: string): void {
    if (category === 'Talent') {
      this.selectedContent = 'Sign-up & Profile Creation';
    } else if (category === 'Clubs & Scouts') {
      this.selectedContent = 'Sign-up & Profile Creation'; // Default content for Clubs & Scouts
    }
  }

  // Manage Navbar Expansion
  isNavbarExpanded = false;

  toggleNavbar(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }
}

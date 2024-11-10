import { Component, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { trigger, transition, style, animate } from '@angular/animations';

export interface ClubMember {
  name: string;
  image: string;
  dob: string;
  cornerImage?: string;
  imageClass?: string; // Class for the main image
  cornerImageClass?: string; // Class for the corner image
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // Start from above
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })) // Fade in and slide down to original position
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateY(20px)' })) // Fade out and slide up
      ])
    ]),
    
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0 }), // Start with opacity 0
        animate('500ms ease-in', style({ opacity: 1 })) // Fade in without moving
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 })) // Fade out
      ])
    ]),
    
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0 }), // Start with opacity 0
        animate('500ms ease-in', style({ opacity: 1 })) // Fade in to full opacity
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 })) // Fade out
      ])
    ]),
    
    trigger('rotateIn', [
      transition(':enter', [
        style({ opacity: 0 }), // Start with opacity 0
        animate('500ms ease-in', style({ opacity: 1 })) // Fade in to full opacity
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 })) // Fade out
      ])
    ])
  ]
})
export class IndexComponent {
  @ViewChild('owlCarousel') owlCarousel!: ElementRef;


  players = [
    { name: 'Ronaldinho Gaúcho', image: './assets/images/Ronaldinho Gaúcho.svg', year: '2004' },
    { name: 'Ziddane', image: './assets/images/ziddane.svg', year: '2004' },
    { name: 'FC Thun', image: './assets/images/FC Thun 1.svg', year: '2004' },
    { name: 'Gabriel Jesus', image: './assets/images/Gabriel Jesus.svg', year: '2004' },
    { name: 'Eütoile Carouge FC', image: './assets/images/Eütoile Carouge FC..png', year: '2004' },
    { name: 'Harry Kane', image: './assets/images/Harry Kane.svg', year: '2004' },
    { name: 'Messi', image: './assets/images/Messi.svg', year: '2004' }
  ];
  

  // Initialize the array of club members
  clubMembers: ClubMember[] = [
    {
      name: 'Ziddane',
      image: './assets/images/network-ziddae.svg',
      dob: '2003',
      cornerImage: './assets/images/Navy.svg',
      imageClass: 'ziddane-image',
      cornerImageClass: 'navy-corner'
    },
    {
      name: 'FC Thun',
      image: './assets/images/FC Thun 1.svg',
      dob: '',
      imageClass: 'fc-thun-image'
    },
    {
      name: 'Ronaldinho Gaúcho',
      image: './assets/images/Ronaldinho Gaúcho.svg',
      dob: '2004',
      cornerImage: './assets/images/SC Bru╠êhl SG.svg.svg',
      imageClass: 'ronaldinho-image',
      cornerImageClass: 'sc-bruehl-corner'
    },
    {
      name: 'FC Rapperswil Jona',
      image: './assets/images/fussball.svg',
      dob: '',
      imageClass: 'fc-rapperswil-image'
    },
    {
      name: 'Jamie Vardy',
      image: './assets/images/jammie.svg',
      dob: '2003',
      cornerImage: './assets/images/FC Wil.svg',
      imageClass: 'jamie-vardy-image',
      cornerImageClass: 'fc-wil-corner'
    },
    {
      name: 'Eütoile Carouge FC',
      image: './assets/images/E╠ütoile Carouge FC..png',
      dob: '',
      imageClass: 'eutoile-image'
    },
    {
      name: 'Mohamed Salah',
      image: './assets/images/mohamad.svg',
      dob: '2003',
      cornerImage: './assets/images/FC Thun 1.svg',
      imageClass: 'mohamed-image',
      cornerImageClass: 'fc-thun-corner'
    }
  ];

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
    autoplayTimeout: 3000,
    autoplaySpeed: 500,
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
        items: 7
      }
    }
  };

  // Default selected content and category
  selectedContent: string = 'Sign-up & Profile Creation';
  selectedCategory: string = 'Talent'; // Default to Talent

  // Manage Navbar Expansion
  isNavbarExpanded = false;

  toggleNavbar(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  // // Method to set the selected content
  // showContent(content: string): void {
  //   this.selectedContent = content;
  // }

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

  // Event handlers for mouse enter and leave
  onMouseEnter() {
    this.owlCarousel.nativeElement.classList.add('stop-autoplay');
  }

  onMouseLeave() {
    this.owlCarousel.nativeElement.classList.remove('stop-autoplay');
  }

  onTouchStart() {
    this.onMouseEnter(); // Stop autoplay on touch start
  }

  onTouchEnd() {
    this.onMouseLeave(); // Resume autoplay on touch end
  }


  showContent(content: string): void {
    this.selectedContent = content;
  }
  
  //   // Determine the ID of the target element
  //   let elementId = '';
  //   switch (content) {
  //     case 'Sign-up & Profile Creation':
  //       elementId = 'sign-up';
  //       break;
  //     case 'Networking & Opportunity':
  //       elementId = 'networking';
  //       break;
  //     case 'Success & Progression':
  //       elementId = 'success';
  //       break;
  //   }
  
  //   // Smooth scroll to the target element over 3 seconds (3000 milliseconds)
  //   if (elementId) {
  //     const element = document.getElementById(elementId);
  //     if (element) {
  //       const startPosition = window.pageYOffset; // Current scroll position
  //       const targetPosition = element.getBoundingClientRect().top + startPosition; // Target position
  //       const distance = targetPosition - startPosition; // Distance to scroll
  //       const duration = 3000; // Duration of the scroll in milliseconds (3 seconds)
  //       let startTime: number | null = null;
  
  //       // Animation function
  //       const animation = (currentTime: number) => {
  //         if (startTime === null) startTime = currentTime;
  //         const timeElapsed = currentTime - startTime;
  //         const progress = Math.min(timeElapsed / duration, 1); // Normalize progress to [0, 1]
  //         window.scrollTo(0, startPosition + distance * progress); // Scroll to current position
          
  //         // Apply translateY effect
  //         element.style.transform = `translateY(${(2 * progress)}px)`;
          
  //         if (timeElapsed < duration) requestAnimationFrame(animation); // Continue animation if not finished
  //       };
  
  //       requestAnimationFrame(animation); // Start the animation
  //     }
  //   }
  // }
  
  
adVisible: boolean[] = [true, true, true, true, true]; // Array to manage ad visibility

ngOnInit() {
  // Initially, all ads are visible
  this.adVisible = [true, true, true, true, true];
}

closeAd(index: number) {
  this.adVisible[index] = false; // Set the specific ad to not visible based on index
}
  
  
  
}

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  images = [
    { src: 'assets/images/slider-image.png', alt: 'Image 1' },
    { src: 'assets/images/About-us-banner.png', alt: 'Image 2' },
    { src: 'assets/images/banner-bg.png', alt: 'Image 3' }
  ];

  currentImageIndex = 0;
  intervalId: any;
  touchStartX: number = 0;

  ngOnInit() {
    this.startAutoplay();
    this.adVisible = [true, true, true, true, true];
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  changeImage(imageSrc: string) {
    this.currentImageIndex = this.images.findIndex(image => image.src === imageSrc);
    this.resetAutoplay();
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  startAutoplay() {
    this.intervalId = setInterval(() => this.nextImage(), 3000);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const touchEndX = event.touches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;

    // Threshold for swipe detection
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.previousImage(); // Swipe right
      } else {
        this.nextImage(); // Swipe left
      }
      this.resetAutoplay(); // Reset autoplay after manual interaction
      this.touchStartX = touchEndX; // Update touch start position for further swipes
    }
  }

  onTouchEnd(event: TouchEvent) {
    // Handle any logic when touch ends, if necessary
  }

  get currentImage() {
    return this.images[this.currentImageIndex].src;
  }

  adVisible: boolean[] = [true, true, true, true, true]; // Array to manage ad visibility

closeAd(index: number) {
  this.adVisible[index] = false; // Set the specific ad to not visible based on index
}
}

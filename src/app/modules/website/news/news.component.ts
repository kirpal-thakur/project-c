import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { WebPages } from '../../../services/webpages.service';

interface NewsData {
  id: number;
  title: string;
  created_at: string;
  featured_image: string;
}

interface SliderImage {
  featured_image: string;
  title: string;
  date: string;
  buttonText: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  currentImageIndex: number = 0;
  banner_title: string = '';
  news_title: string = '';
  slider_title: string = '';
  slider_date: string = '';
  slider_btn_txt: string = '';
  news_img_path: string = '';
  latestNewsData: NewsData[] = [];
  intervalId: any;
  touchStartX: number = 0;
  advertisemnetData: any;
  advertisemnetUrl: string = '';
  base_url: string = '';
  adVisible: boolean[] = [true, true, true, true, true];

  images: SliderImage[] = [
    {
      featured_image: 'assets/images/slider-image.png',
      title: 'Welcome to Soccer World',
      date: 'January 1, 2025',
      buttonText: 'Learn More 1'
    },
    {
      featured_image: 'assets/images/About-us-banner.png',
      title: 'Discover the Legends',
      date: 'February 1, 2025',
      buttonText: 'Learn More 2'
    },
    {
      featured_image: 'assets/images/banner-bg.png',
      title: 'Unleash Your Potential',
      date: 'March 1, 2025',
      buttonText: 'Learn More 3'
    }
  ];

  constructor(private webPages: WebPages) {}

  ngOnInit() {
    this.startAutoplay();
    this.webPages.languageId$.subscribe((data) => {
      this.getPageData(data);
    }, error => {
      console.error('Error fetching language data', error);
    });
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  getPageData(languageId: any) {
    this.webPages.getDynamicContentPage('news', languageId).subscribe((res) => {
      if (res.status) {
        this.advertisemnetData = res.data.advertisemnetData;
        this.advertisemnetUrl = res.data.advertisemnet_base_url;
        this.slider_title = res.data.pageData.slider_title;
        this.news_title = res.data.pageData.news_title;
        this.latestNewsData = res.data.latestNewsData;
        this.news_img_path = res.data.news_img_path;
        this.slider_btn_txt = res.data.pageData.slider_btn_txt;
        this.slider_date = res.data.pageData.slider_date;

        this.images = res.data.newsSliderData || this.images;
        this.base_url = res.data.base_url;
      }
    }, error => {
      console.error('Error fetching dynamic page data', error);
    });
  }

  changeImage(imageSrc: string, index: number) {
    this.currentImageIndex = index;
    this.resetAutoplay();
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
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

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.previousImage(); // Swipe right
      } else {
        this.nextImage(); // Swipe left
      }
      this.resetAutoplay();
      this.touchStartX = touchEndX;
    }
  }

  onTouchEnd(event: TouchEvent) {
    // Optional: Logic for touch end can be added here if needed
  }

  closeAd(index: number) {
    this.adVisible[index] = false;
  }

  get currentImage() {
    return this.images[this.currentImageIndex].featured_image;
  }
  
  getRouterLink(index: number): string {
    // Returns a dynamic URL based on the slider index
    return '/slider-details/' + index;
  }
}

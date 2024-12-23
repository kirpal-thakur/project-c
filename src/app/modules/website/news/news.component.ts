import { Component, HostListener } from '@angular/core';
import { WebPages } from '../../../services/webpages.service';
import { title } from 'process';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
 
  constructor(private webPages: WebPages) { }
  currentImageIndex = 0;
  banner_title:string='';
  news_title:string='';
  slider_title:string='';
  slider_date:string='';
  slider_btn_txt:string='';
  news_img_path:string='';
  latestNewsData:any;
  intervalId: any;
  touchStartX: number = 0;
  advertisemnetData:any;
  advertisemnetUrl:string = '';
  base_url:string= '';
  images = [
    { featured_image: 'assets/images/slider-image.png', title: 'Image 1' },
    { featured_image: 'assets/images/About-us-banner.png', title: 'Image 2' },
    { featured_image: 'assets/images/banner-bg.png', title: 'Image 3' }
  ];
  ngOnInit() {
    this.startAutoplay();
    this.adVisible = [true, true, true, true, true];
    this.webPages.languageId$.subscribe((data) => {
      this.getPageData(data)
    });
  }
  getPageData(languageId: any){
    this.webPages.getDynamicContentPage('news',languageId).subscribe((res) => {
      if(res.status){
          this.advertisemnetData =  res.data.advertisemnetData;
          this.advertisemnetUrl = res.data.advertisemnet_base_url;
          this.slider_title = res.data.pageData.slider_title;
          this.news_title = res.data.pageData.news_title;
          this.latestNewsData = res.data.latestNewsData;
          this.news_img_path = res.data.news_img_path;
          this.slider_btn_txt = res.data.pageData.slider_btn_txt;
          this.slider_date = res.data.pageData.slider_date;
    
          this.images = res.data.newsSliderData;
          this.base_url =  res.data.base_url; 
        }
    });
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  changeImage(imageSrc: string) {
    this.currentImageIndex = this.images.findIndex(image => image.featured_image === imageSrc);
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
    return this.images[this.currentImageIndex].featured_image;
  }

  adVisible: boolean[] = [true, true, true, true, true]; // Array to manage ad visibility

closeAd(index: number) {
  this.adVisible[index] = false; // Set the specific ad to not visible based on index
}
}

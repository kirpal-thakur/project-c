import { Component, OnInit } from '@angular/core';
import { WebPages } from '../../../services/webpages.service';
@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent implements OnInit {
  adVisible: boolean[] = [true, true, true]; // Array to manage ad visibility
  constructor( private webPages: WebPages){

  }

  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true];
    this.webPages.languageId$.subscribe((data) => {
      this.getPageData(data)
      console.log('here is data',data)
    });
   
  }

  getPageData(languageId: any){
    this.webPages.getDynamicHomePage(languageId).subscribe((res) => {
      let pageData = res.data.pageData;
      let sliderData = res.data.sliderData;
      if(res.status){
          // this.pageDetail = pageData;
          // this.sliderDetail = sliderData;
          // this.advertisemnetData = res.data.advertisemnetData;
          // this.imageBaseUrl = res.data.base_url;
        }
    });
  }
  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

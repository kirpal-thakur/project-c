import { Component, OnInit } from '@angular/core';
import { WebPages } from '../../../services/webpages.service';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
  adVisible: boolean[] = [true, true, true]; // Array to manage ad visibility
  banner_title:any = null;
  page_content:any=null;
  banner_img:any=null;
  base_url:any=null;
  constructor( private webPages: WebPages){

  }
  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true];
    this.webPages.languageId$.subscribe((data) => {
      this.getPageData(data)
    });
  }
  getPageData(languageId: any){
    this.webPages.getDynamicContentPage('privacy_policy',languageId).subscribe((res) => {
      if(res.status){
          this.banner_title = res.data.pageData.banner_title;
          this.page_content = res.data.pageData.page_content;
          this.banner_img = res.data.pageData.banner_img;
          this.base_url =  res.data.base_url;
        }
    });
  }
  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

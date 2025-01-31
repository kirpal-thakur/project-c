import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebPages } from '../../../services/webpages.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TermsComponent implements OnInit {
  banner_title: any = null;
  page_content: any = null;
  banner_img: any = null;
  base_url: any = null;
  adVisible: boolean[] = [true, true, true]; // Array to manage ad visibility
  constructor(private webPages: WebPages, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    // Initially, all ads are visible
    this.adVisible = [true, true, true];
    this.webPages.languageId$.subscribe((data) => {
      this.getPageData(data)
    });
  }
  getPageData(languageId: any) {
    this.webPages.getDynamicContentPage('terms_and_conditions', languageId).subscribe((res) => {
      if (res.status) {
        this.banner_title = res.data.pageData.banner_title;
        this.page_content = this.sanitizer.bypassSecurityTrustHtml(res.data.pageData.page_content);
        this.banner_img = res.data.pageData.banner_img;
        this.base_url = res.data.base_url;
      }
    });
  }

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

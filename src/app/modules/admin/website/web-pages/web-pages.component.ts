import { Component, OnInit } from '@angular/core';
import { WebPages } from '../../../../services/webpage.service';
import { DatePipe } from '@angular/common';
interface WebPage {
  id: string;
  user_id: string;
  title: string;
  content: string;
  featured_image: string | null;
  language: string;
  status: string;
  updated_at: string;
  created_at: string;
  slug: string;
  ad_types: string;
  featured_image_path: string | null;
}
@Component({
  selector: 'app-web-pages',
  templateUrl: './web-pages.component.html',
  styleUrl: './web-pages.component.scss',
  providers: [DatePipe]
})

export class WebPagesComponent {
  allPages : WebPage[] =  [];
  constructor(private webpages: WebPages, private datePipe: DatePipe) {}
  ngOnInit(){
    this.getAllPagesData();
  }

  getAllPagesData(){
    this.webpages.getAllPages().subscribe((response) => {
      if(response.status){
        this.allPages = response.data.pages.map((page: any) => ({
          ...page,
          created_at: this.formatDate(page.created_at),
          updated_at: this.formatDate(page.updated_at),
        }));
      }
      console.log(this.allPages, 'web-page-component');
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd.MM.yyyy') || date;
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'draft':
        return 'bg_draft';
      default:
        return 'bg_success';
    }
  }

  getPublishOrDraftFilterData(type:string){
    this.allPages = [];
    this.webpages.getAllPages().subscribe((response) => {
      if(response.status){
        this.allPages = response.data.pages.filter((page: any) => {
            if(page.status == type){
              return page;
            }
        });
      }
    });
  }
}

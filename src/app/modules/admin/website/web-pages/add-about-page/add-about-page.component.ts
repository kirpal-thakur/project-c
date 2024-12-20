// Angular Component
import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WebPages } from '../../../../../services/webpages.service';
import { MatDialogRef } from '@angular/material/dialog';

interface Language {
  id: string;
  description: string;
  language: string;
  status: string;
  updated_at: string;
  created_at: string;
  slug: string;
}

@Component({
  selector: 'app-add-about-page',
  templateUrl: './add-about-page.component.html',
  styleUrls: ['./add-about-page.component.scss']
})
export class AddAboutPageComponent implements OnInit {
  @Input() pageId: any;
  @Input() languages: Language[] = [];

  formData: any = {
    about_banner_title: '',
    about_banner_desc: '',
    about_banner_bg_img: null,
    about_banner_img: null,
    country_section_title: '',
    about_country_names: [],
    country_section_banner_img: null,
    about_hero_heading_txt: '',
    about_hero_btn_txt: '',
    about_hero_btn_link: '',
    page_id: '',
    lang: localStorage.getItem('lang'),
    lang_id: localStorage.getItem('lang_id'),
  };

  countries: string[] = ['Switzerland', 'France', 'Germany', 'Italy', 'Portugal'];

  constructor(private webpages: WebPages, public dialogRef: MatDialogRef<AddAboutPageComponent>) {}

  ngOnInit(): void {
    this.formData.page_id = this.pageId;
  }

  onFileChange(event: any, fieldName: string): void {
    this.formData[fieldName] = event.target.files[0];
  }

  submitForm(): void {
    const formData = new FormData();
    for (const key in this.formData) {
      if (Array.isArray(this.formData[key])) {
        this.formData[key].forEach((item: string, index: number) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, this.formData[key]);
      }
    }
    console.log(this.formData, 'submit-form');
    this.webpages.addAboutPage(formData).subscribe(response => {
      this.dialogRef.close({
        action: 'page-added-successfully'
      });
    });
  }
}
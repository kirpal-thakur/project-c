import { Component, Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WebPages } from '../../../../../services/webpages.service';
import {
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';

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
  selector: 'app-add-contact-page',
  templateUrl: './add-contact-page.component.html',
  styleUrl: './add-contact-page.component.scss'
})
export class AddContactPageComponent {
  @Input() pageId: any;
  @Input() languages: Language[] = [];


  formData: any = {
    page_id: '',
    lang_id: '',
    banner_bg_img: null,
    banner_title: '',
    form_title: '',
    txt_before_radio_btn: '',
    talent_label_txt: '',
    club_label_txt: '',
    scout_label_txt: '',
    submit_btn_txt: '',
    address: '',
    email: '',
  };
  constructor(private webpages: WebPages, public dialogRef : MatDialogRef<AddContactPageComponent>) {}

  ngOnInit() {
  }

  onFileChange(event: any): void {
    this.formData.banner_bg_img = event.target.files[0];
  }

  submitForm(): void {
    this.formData.page_id = this.pageId;
    const formData = new FormData();
    for (const key in this.formData) {
      formData.append(key, this.formData[key]);
    }
    console.log(this.formData, 'submit-form');
    this.webpages.addContactPage(formData).subscribe(response => {
      this.dialogRef.close({
        action: "page-added-successfully"
      });
    });
  }



}

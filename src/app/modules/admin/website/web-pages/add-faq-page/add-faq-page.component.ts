// Angular Component
import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WebPages } from '../../../../../services/webpages.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';

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
  selector: 'app-add-faq-page',
  templateUrl: './add-faq-page.component.html',
  styleUrls: ['./add-faq-page.component.scss']
})
export class AddFaqPageComponent implements OnInit {
  @Input() pageId: any;
  @Input() pageType: any;
  
  @Input() languages: Language[] = [];
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  content: string = '';
  formData: any = {
    slug:'',
    meta_title:'',
    meta_description:'',
    title:'',
    banner_title: '',
    banner_img: null,
    page_content: '',
    page_id: '',
    page_type:'',
    language: localStorage.getItem('lang'),
    lang_id: localStorage.getItem('lang_id'),
  };

  constructor(private webpages: WebPages, public dialogRef: MatDialogRef<AddFaqPageComponent>) {}

  ngOnInit(): void {
    this.editor = new Editor();
    if(this.pageType){
      this.formData.page_type = this.pageType;
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    console.log('content',this.content);
    console.log(this.formData, 'submit-form');
    this.webpages.addContentPage(formData).subscribe(response => {
      this.dialogRef.close({
        action: 'page-added-successfully'
      });
    }); 
  }
}
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators} from '@angular/forms';
import { WebPages } from '../../../../../services/webpages.service';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-add-home-page',
  templateUrl: './add-home-page.component.html',
  styleUrl: './add-home-page.component.scss'
})
export class AddHomePageComponent {
  @Input() pageId: any;
  addHomePageForm: FormGroup;
  languages: Language[] = [];
  selectedLanguage: string = '0';
  showTabForm:boolean=false;
  filesData:  any = {
    banner_bg_img : null,
    banner_img : null,
    hero_bg_img : null,
  }
  first_btn_txt: string = '';
  sec_btn_txt: string = '';
  title: string = '';
  first_tab : { title: string; desc: string; images: File[] }[] = [
    {
      title: '',
      desc : '',
      images: []
    },
    {
      title: '',
      desc : '',
      images: []
    },
    {
      title: '',
      desc : '',
      images: []
    }
  ];

  second_tab : { title: string; desc: string; images: File[] }[] = [
    {
      title: '',
      desc : '',
      images: []
    },
    {
      title: '',
      desc : '',
      images: []
    },
    {
      title: '',
      desc : '',
      images: []
    }
  ];


  constructor(private fb: FormBuilder, private webpages: WebPages, public dialogRef : MatDialogRef<AddHomePageComponent>,) {
    this.addHomePageForm = this.fb.group({
      page_id: [''],
      lang_id: [''],
      banner_bg_img: [null],
      banner_img: [null],
      banner_btn_txt: [''],
      banner_btn_link: [''],
      slider_heading: [''],
      slider_btn_txt: [''],
      slider_btn_link: [''],
      hero_bg_img: [null],
      hero_heading_txt: [''],
      hero_btn_txt: [''],
      hero_btn_link: [''],
      lang: 1,
    });
  }

  ngOnInit() {
    this.getAllLanguages();
  }

  onSubmit(): void {
    this.addHomePageForm.value.page_id = this.pageId;
    this.addHomePageForm.value.banner_bg_img = this.filesData.banner_bg_img;
    this.addHomePageForm.value.banner_img = this.filesData.banner_img;
    this.addHomePageForm.value.hero_bg_img = this.filesData.hero_bg_img;


    let formData = new FormData();
    formData.append('page_id', this.pageId);
    formData.append('lang_id', this.addHomePageForm.value.lang_id);
    formData.append('banner_bg_img', this.addHomePageForm.value.banner_bg_img);
    formData.append('banner_img', this.addHomePageForm.value.banner_img);
    formData.append('banner_btn_txt', this.addHomePageForm.value.banner_btn_txt);
    formData.append('banner_btn_link', this.addHomePageForm.value.banner_btn_link);
    formData.append('slider_heading', this.addHomePageForm.value.slider_heading);
    formData.append('slider_btn_txt', this.addHomePageForm.value.slider_btn_txt);
    formData.append('slider_btn_link', this.addHomePageForm.value.slider_btn_link);
    formData.append('hero_bg_img', this.addHomePageForm.value.hero_bg_img);
    formData.append('hero_heading_txt', this.addHomePageForm.value.hero_heading_txt);
    formData.append('hero_btn_txt', this.addHomePageForm.value.hero_btn_txt);
    formData.append('hero_btn_link', this.addHomePageForm.value.hero_btn_link);
    formData.append('lang', '1');

    this.webpages.addHomePage(formData).subscribe((res) => {
      this.showTabForm = true;
    });

    //  this.showTabForm = true;
  }

  getAllLanguages() {
    this.webpages.getAllLanguage().subscribe((response) => {
      if (response.status) {
        this.languages = response.data.languages;
      }
    });
  }


  handleFileInput(files:any, fieldName:string){
    const input = files.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.filesData[fieldName] = file;
      console.log(this.filesData, fieldName);
    }
  }

  onTabFormSubmit(){
    let formData = new FormData();
    formData.append('page_id', this.pageId);
    formData.append('lang_id', this.addHomePageForm.value.lang_id);
    formData.append('title', this.title);
    formData.append('first_btn_txt', this.first_btn_txt);
    formData.append('sec_btn_txt', this.sec_btn_txt);

    this.first_tab.forEach((tab, index) => {
      formData.append(`first_tab[${index}][title]`, tab.title);
      formData.append(`first_tab[${index}][desc]`, tab.desc);
      tab.images.forEach((file, fileIndex) => {
        formData.append(`first_tab[${index}][images][${fileIndex}]`, file);
      });
    });
    
    // Add second_tab data with files
    this.second_tab.forEach((tab, index) => {
      formData.append(`second_tab[${index}][title]`, tab.title);
      formData.append(`second_tab[${index}][desc]`, tab.desc);
      tab.images.forEach((file, fileIndex) => {
        formData.append(`second_tab[${index}][images][${fileIndex}]`, file);
      });
    });
    formData.append('lang', '1');
    this.webpages.addHomePageTabData(formData).subscribe((res) => {
      this.dialogRef.close({
        action: "page-added-successfully"
      });
    });
  }

  handleTabFilesInput(files: Event, index:number, type:string) {
    const input = files.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0], 'tstinlksdlksdj');
      const selectedFiles = Array.from(input.files);
      console.log([input.files[0], input.files[1], input.files[2]], 'sdkjdskjsdf');
      if(type == 'first_tab'){
        this.first_tab[index].images = [...selectedFiles];
        console.log(this.first_tab, 'testing...');
      }else{
        this.second_tab[index].images = [...selectedFiles];
      }      
    }
  }

}
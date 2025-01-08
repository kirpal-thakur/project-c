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
  @Input() languages: Language[] = [];
  addHomePageForm: FormGroup;
  selectedLanguage: string = '0';
  showTabForm: boolean = false;
  filesData:  any = {
    banner_bg_img : null,
    banner_img : null,
    hero_bg_img : null,
  }
  baseUrl: string = '';
  first_btn_txt: string = '';
  sec_btn_txt: string = '';
  title: string = '';

  // Define the tab type
  first_tab = [
    {
      title: '',
      desc: '',
      images: [] as File[], // Specify the type of the images array
      imagePreviews: [] as string[], // Specify the type of the previews array
    },
  ];

  second_tab = [
    {
      title: '',
      desc: '',
      images: [] as File[], // Specify the type of the images array
      imagePreviews: [] as string[], // Specify the type of the previews array
    },
  ];

  // first_tab: { title: string; desc: string; images: File[]; imagePreviews: string[] }[] = [
  //   {
  //     title: '',
  //     desc: '',
  //     images: [],
  //     imagePreviews: []
  //   },
  //   {
  //     title: '',
  //     desc: '',
  //     images: [],
  //     imagePreviews: []
  //   },
  //   {
  //     title: '',
  //     desc: '',
  //     images: [],
  //     imagePreviews: []
  //   }
  // ];

  // second_tab: { title: string; desc: string; images: File[]; imagePreviews: string[] }[] = [
  //   {
  //     title: '',
  //     desc: '',
  //     images: [],
  //     imagePreviews: []
  //   },
  //   {
  //     title: '',
  //     desc: '',
  //     images: [],
  //     imagePreviews: []
  //   },
  //   {
  //     title: '',
  //     desc: '',
  //     images: [],
  //     imagePreviews: []
  //   }
  // ]

  imageLoaded: boolean = false;

  bannerImagePreview: any = null;
  heroBgImagePreview: any = null;
  bannerBgImagePreview: any = null;


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
      meta_title: [''],
      meta_description: [''],
      lang: localStorage.getItem('lang_id'),
    });
  }

  ngOnInit() {
     if(this.pageId){
        this.getPagebyId(this.pageId);
     }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('page_id', this.pageId);
    formData.append('lang_id', this.addHomePageForm.value.lang);

    // Append files
    if (this.filesData.banner_bg_img) {
      formData.append('banner_bg_img', this.filesData.banner_bg_img);
    }

    if (this.filesData.banner_img) {
      formData.append('banner_img', this.filesData.banner_img);
    }

    if (this.filesData.hero_bg_img) {
      formData.append('hero_bg_img', this.filesData.hero_bg_img);
    }

    // Append text fields
    formData.append('banner_btn_txt', this.addHomePageForm.value.banner_btn_txt);
    formData.append('banner_btn_link', this.addHomePageForm.value.banner_btn_link);
    formData.append('slider_heading', this.addHomePageForm.value.slider_heading);
    formData.append('slider_btn_txt', this.addHomePageForm.value.slider_btn_txt);
    formData.append('slider_btn_link', this.addHomePageForm.value.slider_btn_link);
    formData.append('hero_heading_txt', this.addHomePageForm.value.hero_heading_txt);
    formData.append('hero_btn_txt', this.addHomePageForm.value.hero_btn_txt);
    formData.append('hero_btn_link', this.addHomePageForm.value.hero_btn_link);
    formData.append('meta_title', this.addHomePageForm.value.meta_title);
    formData.append('meta_description', this.addHomePageForm.value.meta_description);

    this.webpages.addHomePage(formData).subscribe((res) => {
      this.showTabForm = true;
    });
  }


  onTabFormSubmit() {
    let formData = new FormData();
    formData.append('page_id', this.pageId);
    formData.append('lang_id', this.addHomePageForm.value.lang_id);
    formData.append('title', this.title);
    formData.append('first_btn_txt', this.first_btn_txt);
    formData.append('sec_btn_txt', this.sec_btn_txt);

    // Add first_tab data with changed files
    this.first_tab.forEach((tab, index) => {
      formData.append(`first_tab[${index}][title]`, tab.title);
      formData.append(`first_tab[${index}][desc]`, tab.desc);
      if (tab.images && tab.images.length > 0) {
        tab.images.forEach((file, fileIndex) => {
          if (file instanceof File) { // Only append if the file is newly changed
            formData.append(`first_tab[${index}][images][${fileIndex}]`, file);
          }
        });
      }
    });

    // Add second_tab data with changed files
    this.second_tab.forEach((sec_tab, index) => {
      formData.append(`second_tab[${index}][title]`, sec_tab.title);
      formData.append(`second_tab[${index}][desc]`, sec_tab.desc);
      if (sec_tab.images && sec_tab.images.length > 0) {
        sec_tab.images.forEach((file, fileIndex) => {
          if (file instanceof File) { // Only append if the file is newly changed
            formData.append(`second_tab[${index}][images][${fileIndex}]`, file);
          }
        });
      }
    });

    this.webpages.addHomePageTabData(formData).subscribe((res) => {
      this.dialogRef.close({
        action: "page-added-successfully",
      });
    });
  }


  handleTabFilesInput(event: Event, index: number, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFiles = Array.from(input.files);

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;

          if (type === 'first_tab') {
            // Ensure the object and arrays are initialized
            if (!this.first_tab[index]) {
              this.first_tab[index] = { title: '', desc: '', images: [], imagePreviews: [] };
            }
            if (!this.first_tab[index].images) {
              this.first_tab[index].images = [];
            }
            if (!this.first_tab[index].imagePreviews) {
              this.first_tab[index].imagePreviews = [];
            }

            // Push file and preview
            this.first_tab[index].images.push(file);
            if (result) {
              this.first_tab[index].imagePreviews.push(result as string);
            }
          } else if (type === 'second_tab') {
            // Ensure the object and arrays are initialized
            if (!this.second_tab[index]) {
              this.second_tab[index] = { title: '', desc: '', images: [], imagePreviews: [] };
            }
            if (!this.second_tab[index].images) {
              this.second_tab[index].images = [];
            }
            if (!this.second_tab[index].imagePreviews) {
              this.second_tab[index].imagePreviews = [];
            }

            // Push file and preview
            this.second_tab[index].images.push(file);
            if (result) {
              this.second_tab[index].imagePreviews.push(result as string);
            }
          }
        };
        reader.onerror = (e) => {
          console.error('Error reading file:', e);
        };
        reader.readAsDataURL(file);
      });
    } else {
      console.warn('No files selected or input is null.');
    }
  }


  getPagebyId(id:number){

    this.webpages.getPageById(id).subscribe(response => {
      if (response.status) {

         this.addHomePageForm.patchValue({
         // banner_bg_img: response.data.pageData.banner_bg_img,
         // banner_img: response.data.pageData.banner_img,
          banner_btn_txt: response.data.pageData.banner_btn_txt,
          banner_btn_link: response.data.pageData.banner_btn_link,
          slider_heading: response.data.pageData.slider_heading,
          slider_btn_txt: response.data.pageData.slider_btn_txt,
          slider_btn_link: response.data.pageData.slider_btn_link,
         // hero_bg_img: response.data.pageData.hero_bg_img,
          hero_heading_txt: response.data.pageData.hero_heading_txt,
          hero_btn_txt: response.data.pageData.hero_btn_txt,
          hero_btn_link: response.data.pageData.hero_btn_link,

          meta_title: response.data.meta_title,
          meta_description: response.data.meta_description,
        })

        this.bannerBgImagePreview = response?.data?.pageData?.banner_bg_img ? response.data.base_url + response.data.pageData.banner_bg_img : null;
        this.bannerImagePreview  = response?.data?.pageData?.banner_img ? response.data.base_url + response.data.pageData.banner_img : null;
        this.heroBgImagePreview = response?.data?.pageData?.hero_bg_img ? response.data.base_url + response.data.pageData.hero_bg_img : null;

        this.first_btn_txt = response.data.pageData.tabs_data.first_btn_txt;
        this.first_tab = response.data.pageData.tabs_data.first_tab;
        this.sec_btn_txt = response.data.pageData.tabs_data.sec_btn_txt;
        this.second_tab = response.data.pageData.tabs_data.second_tab;
        this.title = response.data.pageData.tabs_data.title;
        this.baseUrl = response.data.base_url;
        this.baseUrl = response.data.base_url;

        // Assign images to preview arrays for both tabs
        this.first_tab.forEach((tab, index) => {
          // Check if there are images for the tab
          if (tab.images && tab.images.length > 0) {
            tab.imagePreviews = tab.images.map((image: any) => {
              return this.baseUrl + image;
            });
          }
        });

        this.second_tab.forEach((tab, index) => {
          // Check if there are images for the tab
          if (tab.images && tab.images.length > 0) {
            tab.imagePreviews = tab.images.map((image: any) => {
              return this.baseUrl + image;
            });
          }
        });

      }
    });

  }

  handleFileInput(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.filesData[fieldName] = file;

      // For image preview
      const reader = new FileReader();
      reader.onload = () => {
        if (fieldName === 'banner_img') {
          this.bannerImagePreview = reader.result;
        } else if (fieldName === 'banner_bg_img') {
          this.bannerBgImagePreview = reader.result;
        } else if (fieldName === 'hero_bg_img') {
          this.heroBgImagePreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  removeImage(fieldName: string): void {
    this.filesData[fieldName] = 'remove_image';
    if (fieldName === 'banner_img') {
      this.bannerImagePreview = null;
    } else if (fieldName === 'banner_bg_img') {
      this.bannerBgImagePreview = null;
    } else if (fieldName === 'hero_bg_img') {
      this.heroBgImagePreview = null;
    }
  }


  // Remove an image from the list
  removeTabImage(type: string, tabIndex: number, imageIndex: number): void {
    if (type === 'first_tab') {
      this.first_tab[tabIndex].images.splice(imageIndex, 1);
      this.first_tab[tabIndex].imagePreviews.splice(imageIndex, 1);
    } else {
      this.second_tab[tabIndex].images.splice(imageIndex, 1);
      this.second_tab[tabIndex].imagePreviews.splice(imageIndex, 1);
    }
  }

}
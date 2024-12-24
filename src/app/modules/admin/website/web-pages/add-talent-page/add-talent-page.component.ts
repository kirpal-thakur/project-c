// Angular Component
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-add-talent-page',
  templateUrl: './add-talent-page.component.html',
  styleUrls: ['./add-talent-page.component.scss']
})
export class AddTalentPageComponent implements OnInit {
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
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  content: string = '';
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
  imageLoaded: boolean = false;


  formData: any = {
    slug: '',
    meta_title: '',
    meta_description: '',
    banner_title: '',
    banner_bg_img: null,
    banner_desc: '',
    banner_btn_txt: '',
    banner_imgs: [],
    talent_section_title: '',
    talent_section: {
      first_tab: [{ txt: '', icon: null }],
      sec_tab: [{ txt: '', icon: null }],
      third_tab: [{ txt: '', icon: null }],
    },
    feature_sctn: [
      { title: '', desc: '', icon: null },
    ],
    feature_sctn_title:'',
    pricing_tab: [
      {
        monthly_label: '',
        yearly_label: '',
        plan_name: '',
        monthly_plan_price: '',
        yearly_plan_price: '',
        monthly_plan_price_currency: '',
        yearly_plan_price_currency: '',
        plan_feature_title: '',
        plan_feature_desc: [],
      },
    ],
    page_content: '',
    page_id: '',
    page_type: '',
    language: localStorage.getItem('lang'),
    lang_id: localStorage.getItem('lang_id'),
  };


  bannerImagePreview: string | ArrayBuffer | null = null;

  constructor(private webpages: WebPages, public dialogRef: MatDialogRef<AddTalentPageComponent>,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.editor = new Editor();
    if (this.pageType) {
      this.formData.page_type = this.pageType;
    }
    if (this.pageId) {
      this.formData.page_id = this.pageId;
      this.getPageById(this.pageId);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.formData[fieldName] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.bannerImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Update the `removeImage` method to reset the `imageLoaded` property.
  removeImage(fieldName: string): void {
    this.formData[fieldName] = 'remove_image';
    this.bannerImagePreview = null;
    this.imageLoaded = false;
  }


  submitForm(): void {
    const formData = new FormData();

    // Helper function to append nested objects to FormData
    const appendNestedObject = (prefix: string, obj: any) => {
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any, index: number) => {
            if (typeof item === 'object' && item !== null) {
              appendNestedObject(`${prefix}[${key}][${index}]`, item);
            } else {
              formData.append(`${prefix}[${key}][${index}]`, item);
            }
          });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          appendNestedObject(`${prefix}[${key}]`, obj[key]);
        } else {
          formData.append(`${prefix}[${key}]`, obj[key]);
        }
      }
    };

    // Iterate over this.formData and append fields
    for (const key in this.formData) {
      if (Array.isArray(this.formData[key])) {
        this.formData[key].forEach((item: any, index: number) => {
          if (typeof item === 'object' && item !== null) {
            appendNestedObject(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, item);
          }
        });
      } else if (typeof this.formData[key] === 'object' && this.formData[key] !== null) {
        appendNestedObject(key, this.formData[key]);
      } else {
        formData.append(key, this.formData[key]);
      }
    }

    // Append specific talent_section values (if they exist)
    const talentSection = this.formData?.talent_section;
    if (talentSection) {
      ['first_tab', 'sec_tab', 'third_tab'].forEach(tab => {
        if (talentSection[tab]?.txt) {
          formData.append(`talent_section[${tab}][txt]`, talentSection[tab].txt);
        }
        if (talentSection[tab]?.icon) {
          formData.append(`talent_section[${tab}][icon]`, talentSection[tab].icon);
        }
      });
    }

    // Append the feature_sctn images to the FormData object
    this.formData.feature_sctn.forEach((feature: any, index: number) => {
      if (feature.img) {
        formData.append(`feature_sctn[${index}][img]`, feature.img, feature.img.name);
      }
    });

    // Send the formData
    this.webpages.addContentPage(formData).subscribe(
      response => {
        console.log('Page added successfully:', response);
        this.dialogRef.close({
          action: 'page-added-successfully',
        });
      },
      error => {
        console.error('Error adding page:', error);
        // Optional: Show an error message to the user
      }
    );
  }

  onFeatureFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      // Make sure to store the file in the right index of the feature_sctn array
      this.formData.feature_sctn[index].img = file;

      // Optionally, create a preview of the image for display
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.feature_sctn[index].imgPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getPageById(id: number): void {
    this.webpages.getPageById(id).subscribe((response) => {
      if (response.status) {
        const pageData = response.data.pageData;

        // Map basic fields
        this.formData.page_type = response.data.page_type;
        this.formData.slug = response.data.slug;
        this.formData.page_content = pageData.page_content || '';
        this.formData.meta_title = response.data.meta_title;
        this.formData.meta_description = response.data.meta_description;
        this.formData.banner_title = pageData.banner_title;
        this.formData.banner_desc = pageData.banner_desc;
        this.formData.banner_btn_txt = pageData.banner_btn_txt;
        this.bannerImagePreview = response.data.base_url + pageData.banner_bg_img;

        // Map talent_section
        if (pageData.talent_section) {
          this.formData.talent_section = {
            first_tab: Array.isArray(pageData.talent_section.first_tab) ? pageData.talent_section.first_tab.map((tab: any) => ({
              txt: tab.txt,
              icon: null,
            })) : [], // Default to empty array if not an array
            sec_tab: Array.isArray(pageData.talent_section.sec_tab) ? pageData.talent_section.sec_tab.map((tab: any) => ({
              txt: tab.txt,
              icon: null,
            })) : [],
            third_tab: Array.isArray(pageData.talent_section.third_tab) ? pageData.talent_section.third_tab.map((tab: any) => ({
              txt: tab.txt,
              icon: null,
            })) : [],
          };
        }

        // Map feature_sctn
        if (pageData.feature_sctn) {
          this.formData.feature_sctn = pageData.feature_sctn.map((feature: any) => ({
            title: feature.title,
            desc: feature.desc,
            icon: feature.icon || null, // Initialize icon
          }));
        }

        // Map pricing_tab
        if (pageData.pricing_tab) {
          this.formData.pricing_tab = pageData.pricing_tab.map((plan: any) => ({
            monthly_label: plan.monthly_label,
            yearly_label: plan.yearly_label,
            plan_name: plan.plan_name,
            monthly_plan_price: plan.monthly_plan_price,
            yearly_plan_price: plan.yearly_plan_price,
            monthly_plan_price_currency: plan.monthly_plan_price_currency,
            yearly_plan_price_currency: plan.yearly_plan_price_currency,
            plan_feature_title: plan.plan_feature_title,
            plan_feature_desc: plan.plan_feature_desc || [],
          }));
        }

        // Map additional sections if any
        if (pageData.talent_section_title) {
          this.formData.talent_section_title = pageData.talent_section_title;
        }
        if (pageData.feature_sctn_title) {
          this.formData.feature_sctn_title = pageData.feature_sctn_title;
        }
        if (pageData.pricing_sctn_title) {
          this.formData.pricing_sctn_title = pageData.pricing_sctn_title;
        }

        // Trigger change detection after data is assigned
        this.cdr.detectChanges();
      }
    });
  }


  addFeature(): void {
    this.formData.feature_sctn.push({ title: '', desc: '', icon: '' });
  }

  removeFeature(index: number): void {
    this.formData.feature_sctn.splice(index, 1);
  }

  addPricingPlan(): void {
    this.formData.pricing_tab.push({
      plan_name: '',
      monthly_plan_price: '',
      yearly_plan_price: '',
      monthly_plan_price_currency: '',
      yearly_plan_price_currency: '',
      plan_feature_desc: []
    });
  }

  removePricingPlan(index: number): void {
    this.formData.pricing_tab.splice(index, 1);
  }

  addPricingFeature(planIndex: number): void {
    this.formData.pricing_tab[planIndex].plan_feature_desc.push('');
  }

  removePricingFeature(planIndex: number, featureIndex: number): void {
    this.formData.pricing_tab[planIndex].plan_feature_desc.splice(featureIndex, 1);
  }

}
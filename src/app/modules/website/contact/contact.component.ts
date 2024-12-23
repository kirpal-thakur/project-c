import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WebPages } from '../../../services/webpages.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})

export class ContactComponent implements OnInit {
  base_url: string = '';
  address: string = '';
  semail: string = '';
  banner_title: string = '';
  club_label_txt: string = '';
  form_title: string = '';
  scout_label_txt: string = '';
  submit_btn_txt: string = '';
  talent_label_txt: string = '';
  txt_before_radio_btn: string = '';
  advertisemnetData:any;
  advertisemnetUrl:string = '';
  selectedOption = 'option1'; // Default option for some dropdown/radio buttons
  contactForm!: FormGroup; // Form group for the contact form
  isChecked = false; // Checkbox state
  adVisible: boolean[] = [true, true, true, true]; // Array to manage ad visibility
  captchaResolved = false; // Track if captcha is resolved
  recaptchaToken: string | null = null; // Captcha token for backend validation
  responseMessage: string = '';
  messageType: string = '';  
  constructor(private route: ActivatedRoute, 
    private webPages: WebPages,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    ) { }

  ngOnInit(): void {
    // Initialize form with validation rules
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Adjust pattern as needed
      message: ['', Validators.required],
      domain : window.location.hostname,
      lang : localStorage.getItem('lang'),
    });
    this.webPages.languageId$.subscribe((data) => {
      this.getPageData(data)
    });
  }

  getPageData(languageId: any){
    this.webPages.getDynamicContentPage('contact',languageId).subscribe((res) => {
      if(res.status){
          this.address = res.data.pageData.address;
          this.banner_title = res.data.pageData.banner_title;
          this.club_label_txt = res.data.pageData.club_label_txt;
          this.form_title = res.data.pageData.form_title;
          this.scout_label_txt = res.data.pageData.scout_label_txt;
          this.submit_btn_txt = res.data.pageData.submit_btn_txt;
          this.talent_label_txt = res.data.pageData.talent_label_txt;
          this.txt_before_radio_btn = res.data.pageData.txt_before_radio_btn;
          this.semail= res.data.pageData.email;
          this.advertisemnetData =  res.data.advertisemnetData;
          this.advertisemnetUrl = res.data.advertisemnet_base_url;
          this.base_url =  res.data.base_url; 
        }
    });
  }
  // Form field getters for template validation
  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get message() {
    return this.contactForm.get('message');
  }

  // Handle captcha resolution
  resolved(captchaResponse: string | null): void {
    if (captchaResponse) {
      this.captchaResolved = true;
      this.recaptchaToken = captchaResponse;
      console.log('Captcha resolved:', captchaResponse);
    } else {
      this.captchaResolved = false;
      this.recaptchaToken = null;
      console.log('Captcha not resolved');
    }
  }

  // Handle form submission
  onSubmit(): void {  
    // return false;
    if (this.contactForm.valid && this.captchaResolved && this.recaptchaToken) {
      const formData = { ...this.contactForm.value, captchaToken: this.recaptchaToken };
      const result = {};
      // Send the form data and captcha token to the server
      this.http.post('/api/verify-captcha', formData).subscribe(
        (response) => { 

          // console.log('Form submitted successfully:', result);
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    } else {
      if (!this.captchaResolved) {
        console.error('Captcha not solved');
      }
      if (this.contactForm.invalid) {
        console.error('Form is invalid:', this.contactForm.errors);
      }
    }
    const ContactformData = { ...this.contactForm.value, captchaToken: this.recaptchaToken };
    
    this.http.post<any>('https://api.socceryou.ch/frontend/save-contact-form', ContactformData).subscribe(
      (response) => {
        // console.log('Form submitted successfully:', response);
        if(response.message != '' && response.data.redirect_url != ''){
          this.setResponseMessage(response.message, response.data.class);
          this.router.navigate(['/'+response.data.redirect_url]);
        }else{
          alert('something went wrong');
        }
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }
  // Close specific ad
  closeAd(index: number): void {
    this.adVisible[index] = false; // Hide the ad at the given index
  }

  setResponseMessage(message: string, type: string): void {
    this.responseMessage = message;
    this.messageType = type;

    // Clear message after 3 seconds (optional)
    setTimeout(() => {
      this.responseMessage = '';
      this.messageType = '';
    }, 10000);
  }

}

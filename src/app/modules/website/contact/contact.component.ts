import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  selectedOption = 'option1'; // Default option for some dropdown/radio buttons
  contactForm!: FormGroup; // Form group for the contact form
  isChecked = false; // Checkbox state
  adVisible: boolean[] = [true, true, true, true]; // Array to manage ad visibility
  captchaResolved = false; // Track if captcha is resolved
  recaptchaToken: string | null = null; // Captcha token for backend validation

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize form with validation rules
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Adjust pattern as needed
      message: ['', Validators.required],
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
    if (this.contactForm.valid && this.captchaResolved && this.recaptchaToken) {
      const formData = { ...this.contactForm.value, captchaToken: this.recaptchaToken };

      // Send the form data and captcha token to the server
      this.http.post('/api/verify-captcha', formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
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
  }

  // Close specific ad
  closeAd(index: number): void {
    this.adVisible[index] = false; // Hide the ad at the given index
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ContactComponent implements OnInit {
  selectedOption = 'option1';
  contactForm!: FormGroup;
  isChecked = false;
  adVisible: boolean[] = [true, true, true, true]; // Array to manage ad visibility

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Adjust pattern as needed
      message: ['', Validators.required]
    });
  }

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

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Handle form submission
    } else {
      // Handle form errors
      console.error('Form is invalid', this.contactForm.errors);
    }
  }

  closeAd(index: number): void {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }
}

import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  password: string = '';
  confirm_password: string = '';

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    public talentService : TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Initialize user object if needed
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
  
  onSave(form: NgForm): void {
    // If form is invalid, exit early
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Validate if passwords match
    if (this.password !== this.confirm_password) {
      console.log('Passwords do not match!');
      return;
    }

    this.talentService.changePassword(this.password, this.confirm_password).subscribe(
      (response) => {
        console.log('Password changed successfully:', response);
      },
      (error) => {
        console.error('Error changing password:', error);
      }
    );
    
    // Save the new password details (pass the data back to the parent component)
    this.dialogRef.close({ password: this.password });
  }

  togglePasswordVisibility(inputId: string): void {
    const inputField = document.getElementById(inputId) as HTMLInputElement;
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}

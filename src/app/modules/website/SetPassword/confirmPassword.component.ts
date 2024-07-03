// import { Component, inject, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { ThemeService } from '../../../services/theme.service';
// import { AuthService } from '../../../services/auth.service';
// import { TranslateService } from '@ngx-translate/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({  
//   selector: 'app-confirm-popup',
//   templateUrl: './confirmPassword.component.html',
//   styleUrl: './confirmPassword.component.scss'
// })

// export class ConfirmPasswordComponent {
//   constructor(
//     private themeService: ThemeService,
//     private authService: AuthService,
//     private router: Router,
//     private translateService: TranslateService,
//     private route: ActivatedRoute,
//     private http: HttpClient 
//   ) {}

//     readonly dialogRef = inject(MatDialogRef<ConfirmPasswordComponent>);
  
//     // ngOnInit(): void {
//     //   this.token = this.route.snapshot.queryParams['token'];
//     // }
   
//     close(){
//       this.dialogRef.close();
//     }

//     // onSave(): void {
//     //   if (this.password !== this.confirmPassword) {
//     //     alert('Passwords do not match');
//     //     return;
//     //   }
  
//     //   this.http.post('/api/reset-password', { token: this.token, newPassword: this.password })
//     //     .subscribe(
//     //       () => {
//     //         alert('Password reset successful');
//     //         this.dialogRef.close(true);
//     //         this.router.navigate(['/login']);
//     //       },
//     //       () => {
//     //         alert('Failed to reset password');
//     //       }
//     //     );
//     // }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirmPassword.component.html',
  styleUrls: ['./confirmPassword.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.authService.forgotPassword(this.token,).subscribe(
      response => {
        if (response.status === true) {
          this.message = 'Password reset successful. Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.message = response.message;
        }
      },
      error => {
        console.error('Error resetting password:', error);
        this.message = 'An error occurred. Please try again later.';
      }
    );
  }
}

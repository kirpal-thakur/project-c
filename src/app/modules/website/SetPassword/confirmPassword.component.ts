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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirmPassword.component.html',
  styleUrls: ['./confirmPassword.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  token= '';
  tokenVerified = false;
  tokenErrorTemplate: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ConfirmPasswordComponent>
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.token = params['confirm-token'] || '';
    //   console.log('Magic Token:', this.token);

    //   if (this.token) {
    //     // Call authService to verify magic token
    //     this.authService.magicLogin(this.token).subscribe(
    //       (response: any) => {
    //         console.log('Magic Login Response:', response);
    //         if (response.success) {
    //           this.tokenVerified = true;
    //           this.openModal();
    //         } else {
    //           this.tokenVerified = false;
    //           console.log('Token is not verified please check');
    //           this.openModal();
    //           console.log("popup is not open")
    //         }
    //       },
    //       (error) => {
    //         console.error('Error verifying token:', error);
    //         this.tokenVerified = false;
    //       }
    //     );
    //   } else {
    //     this.tokenVerified = false;
    //     console.log('Token is not provided');
    //   }
    // });
  }
  openModal() {
    this.dialog.open(ConfirmPasswordComponent, {
      width: '500px',
    });
  }
  notverifyed() {
    // Your method logic here
    console.log('Not verified clicked');
  }
  
  }

 

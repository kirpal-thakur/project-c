import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { environment } from '../../../../environments/environment';
import { ConfirmPasswordComponent } from '../SetPassword/confirmPassword.component';
import { MatDialog } from '@angular/material/dialog';


declare var bootstrap: any; // Declare bootstrap
declare var google: any; // Declare google

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit{
  @ViewChild('invalidCredMessage') invalidCredMessage!: ElementRef;
  @ViewChild('registerForm') registerForm!: NgForm; // Define registerForm using ViewChild
  
  name: string = 'Switzerland'; // Current country name, update as needed
  countrie = [
    { name: 'Switzerland', slug: "ch", id: 1, flag: "Switzerland.svg", url: 'https://www.socceryou.ch' },
    { name: 'German', slug: "de", id: 2, flag: "Germany.svg", url: 'https://www.socceryou.de' },
    { name: 'Italy', slug: "it", id: 3, flag: "Italy.svg", url: 'https://www.socceryou.it' },
    { name: 'French Republic', slug: "fr", id: 4, flag: "France.svg", url: 'https://www.socceryou.fr' },
    { name: 'United Kingdom', slug: "uk", id: 5, flag: "England.svg", url: 'https://www.socceryou.co.uk' },
    { name: 'Estonia, Eswatini', slug: "es", id: 6, flag: "Spain.svg", url: 'https://www.socceryou.es' },
    { name: 'Portugal', slug: "pt", id: 7, flag: "Portugal.svg", url: 'https://www.socceryou.pt' },
    { name: 'Belgium', slug: "be", id: 8, flag: "Belgium.svg", url: 'https://www.socceryou.be' },
    { name: 'Denmark', slug: "dk", id: 9, flag: "Denmark.svg", url: 'https://www.socceryou.se' },
    { name: 'Sweden', slug: "se", id: 10, flag: "Sweden-sweden.svg", url: 'https://www.socceryou.dk' },
  ];


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  isDropdownUp: boolean = false;

  // onCountryChange(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.selectedCountryId = selectElement.value;

  //   // Check if we should flip the dropdown based on available space
  //   this.isDropdownUp = this.shouldDropdownBeUp();
  // }

  shouldDropdownBeUp(): boolean {
    // Logic to determine if dropdown should be flipped
    // Here we can simply return true for demonstration, adjust as necessary
    return true; // Replace with actual condition
  }

  countries = environment.domains; // Assuming the countries are defined in the environment
  selectedCountryId: string = '';
  domains: any = environment.domains;


  onCountryChange(event: any): void {
    this.selectedCountryId = event.target.value;
    console.log('Selected Country ID:', this.selectedCountryId);
    // You can perform additional logic here, such as calling an API with the selected country ID
  }

  selectedCountry: number | null = null;

 activeIndex: number = 1; // -1 means no button is active initially
  isVisible: boolean = true;
  setActive(index: number): void {
    this.activeIndex = index; // Set the activeIndex to the index of the clicked button
    this.role = index === 1 ? 4 : index === 2 ? 2 : 3; // Update role based on activeIndex

  }
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  role: number = 4; // Initialize role to 4 (Player)
  email: string = '';
  language: string = '1';
  newsletter: boolean = false;
  userDomain: string = '1';
  confirmPassword: string = '';
  privacyPolicy: boolean = false;
  loginButtonClicked: boolean = false;
  invalidCred: string = '';

  registerFormSubmitted: boolean = false;
  registerError: string = '';
  forgotPasswordEmail: string = '';
  forgotPasswordMessage: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
     private route: ActivatedRoute,
      private router: Router, 
      private translateService: TranslateService, 
      public dialog: MatDialog
     ) {
       // Set default language (for example, Switzerland is defaulting to French)
    this.translateService.setDefaultLang('fr'); // Set default language
    this.translateService.use('fr'); // Use default language
     }

  lang:string = '';
  token= '';
  tokenVerified = false;

  ngOnInit(): void {
      // Check if the google.accounts.id library is loaded
      if (typeof google !== 'undefined' && typeof google.accounts !== 'undefined' && typeof google.accounts.id !== 'undefined') {
        // Initialize Google Sign-In
        this.initializeGoogleSignIn();
      } else {
        // Google API script might not be loaded yet; wait for it to load
        console.warn('Google API script is not fully loaded.');
        this.countries = environment.domains;
      }

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
    //           this.notverifyed();
    //           console.log("popup is not open")
    //         }
    //       },
    //       (error) => {
    //         console.error('Error verifying token:', error);
    //         this.tokenVerified = false;
    //         this.notverifyed();
    //       }
    //     );
    //   } else {
    //     this.tokenVerified = false;
    //     console.log('Token is not provided');
    //   }
    // });

  }

  performMagicLogin(token: string) {
    this.authService.magicLogin(token).subscribe(
      magicLoginResponse => {
        console.log('Magic login response:', magicLoginResponse);
        if (magicLoginResponse.status === true) {
          this.openModal();
          
        } else {
          console.error('Auto-login failed:', magicLoginResponse.message);
          console.log("Token is not verified");
        }
      },
      error => {
        console.error('An error occurred during auto-login:', error);
        // Handle error scenario if needed
      }
    );
  }

  ChangeLang(domainSlug: string): void {
    // Find the domain based on the slug
    const selectedDomain = this.domains.find((domain: any) => domain.slug === domainSlug);
  
    if (selectedDomain) {
      // Update the country name based on the selected domain
      this.name = selectedDomain.name;
  
      // Store the selected language (slug) and country in localStorage
      localStorage.setItem('lang', selectedDomain.slug);  // Store the language slug
      localStorage.setItem('country', selectedDomain.name);  // Store the country name
  
      // Switch the language using ngx-translate
      this.translateService.use(selectedDomain.slug);
  
      console.log(`Country changed to: ${selectedDomain.name}, Language changed to: ${selectedDomain.slug}`);
    } else {
      console.error(`No domain found for slug: ${domainSlug}`);
    }
  }
  
  


  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }

  login() {
    this.loginButtonClicked = true;

    if (!this.email || !this.password) {
      console.error('Please fill in all required fields.');
      return;
    }

    const selectedLanguage = localStorage.getItem('lang') || '';
    const domain = environment.targetDomain?.domain || 'ch';

    const loginData = {
      email: this.email,
      password: this.password,
      lang: selectedLanguage,
      domain: domain,
      
    };

    this.authService.login(loginData).subscribe(
      response => {
        console.log('Login response:', response);
        if (response.status === false) {
          console.error('Login failed:', response.message);
          this.invalidCred = response.message;
          this.showInvalidCredMessage();
        } else {
          console.log('Login successful.');
          const token = response.data.token;
          const userData = response.data.user_data;
        
          console.log(userData,"check user data index ")


          localStorage.setItem('authToken', token);
        
          const storedToken = localStorage.getItem('authToken');
          localStorage.setItem('userData', JSON.stringify(userData));
        
          if (storedToken === token) {
            console.log('Token successfully saved to local storage.');

            this.translateService.use(selectedLanguage);

            // const selectedLanguage = localStorage.getItem('lang');
            // if (selectedLanguage) {
            //   this.translateService.use(selectedLanguage);
            // }

            // let targetDomain = '';
            //   if (selectedLanguage === 'en') {
            //     targetDomain = environment.targetDomain.en;
            //   } else if (selectedLanguage === 'de') {
            //     targetDomain = environment.targetDomain.de;
            //   }
            //   console.log(targetDomain, "domain");
            //   console.log(selectedLanguage, "check language")

            let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-login'));
            if (modal) {
              modal.hide();
            }
            this.router.navigate(['/Admin/Dashboard']);
            // window.location.href = `${targetDomain}/Admin/Dashboard`;
          } else {
            console.error('Failed to save token to local storage.');
          }
        }
      },
      error => {
        console.error('An error occurred while logging in:', error);
      }
    );
  }

  private showInvalidCredMessage() {
    if (this.invalidCredMessage) {
      this.invalidCredMessage.nativeElement.style.display = 'block';
    }
  }

  register() {
    this.registerFormSubmitted = true;

    if (!this.isFormValid()) {
      console.error('Please fill in all required fields.');
      return;
    }

    const selectedLanguage = localStorage.getItem('lang') || '';
    const domain = environment.targetDomain?.domain || 'ch';

    const registrationData = {
      first_name: this.firstName,
      last_name: this.lastName,
      username: this.username,
      role: this.role,
      email: this.email,
      newsletter: this.newsletter,
      user_domain: this.userDomain,
      password: this.password,
      password_confirm: this.confirmPassword,
      privacy_policy: this.privacyPolicy,
      lang: selectedLanguage, 
      domain: domain
    };


    this.authService.register(registrationData).subscribe(
      response => {
        console.log('Registration response:', response);
        if (response.status === true) {
          const registerModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal1'));
          if (registerModal) {
            registerModal.hide();
          }
          const loginModal = new bootstrap.Modal(document.getElementById('exampleModal-login'));
          loginModal.show();
        } else {
          let errorMessage = '';
          // Check if response.message is an object
          if (typeof response.message === 'object') {
            // Loop through each error message and concatenate them
            Object.keys(response.message).forEach(key => {
              errorMessage += response.message[key] + ' ';
            });
          } else {
            errorMessage = response.message;
          }
          this.registerError = errorMessage.trim(); // Trim to remove any leading or trailing spaces
          this.registerFormSubmitted = false; // Reset form submission flag to allow re-submission
        }
      },
      error => {
        console.error('Registration failed:', error);
        if (error && error.status === 400 && error.error && error.error.data) {
          const errorData = error.error.data;
          if (errorData.username) {
            this.registerForm.controls['username'].setErrors({ usernameExists: true });
          }
          if (errorData.email) {
            this.registerForm.controls['email'].setErrors({ emailExists: true });
          }
          this.registerError = errorData.message || 'An error occurred during registration.';
        } else {
          console.error('An error occurred while registering:', error);
          this.registerError = 'An error occurred during registration. Please try again.';
        }
        this.registerFormSubmitted = false; // Reset form submission flag to allow re-submission
      }
    );
  }

  isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.role !== null &&
      this.email.trim() !== '' &&
      this.language !== null &&
      this.newsletter !== null &&
      this.userDomain.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.privacyPolicy !== false
    );
  }

  forgotPassword() {
    if (!this.forgotPasswordEmail.trim()) {
      console.error('Email is required for password recovery.');
      this.forgotPasswordMessage = 'Please provide a valid email address.';
      return;
    }

    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(
      response => {
        console.log('Password recovery response:', response);
        if (response.status) {
            this.forgotPasswordMessage = response.message;

            // const magicToken = response.data.magic_link_url;
            // const magic_link_url = `http://localhost:4200/Index?confirm-token=${magicToken}`;
            // console.log("Magic link URL:", magic_link_url);
            // this.authService.magicLogin(magic_link_url).subscribe(
            //   magicLoginResponse => {
            //     console.log('Magic login response:', magicLoginResponse);
            //     if (magicLoginResponse.status === true) {
            //       console.log('Auto-login successful.');
            //       this.router.navigate(['/Admin/Dashboard']);
            //     } else {
            //       console.error('Auto-login failed:', magicLoginResponse.message);
            //       this.forgotPasswordMessage = 'Auto-login failed. Please try again.';
            //     }
            //   },
            //   magicLoginError => {
            //     console.error('An error occurred during auto-login:', magicLoginError);
            //     this.forgotPasswordMessage = 'An error occurred during auto-login. Please try again later.';
            //   }
            // );
        } else {
          console.error('Password recovery failed:', response.message);
          this.forgotPasswordMessage = response.message;
        }
      },
      error => {
        console.error('An error occurred while requesting password recovery:', error);
        this.forgotPasswordMessage = 'An error occurred. Please try again later.';
      }
    );
  }




  // forgotPassword(): void {
  //   if (!this.forgotPasswordEmail.trim()) {
  //     console.error('Email is required for password recovery.');
  //     this.forgotPasswordMessage = 'Please provide a valid email address.';
  //     return;
  //   }

  //   this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(
  //     response => {
  //       console.log('Password recovery response:', response);
  //       if (response.status === true && response.data.magic_link_url) {
  //         const magicToken = response.data.magic_link_url;
  //         const magicLinkUrl = `http://localhost:4200/Index?confirm-token=${magicToken}`;
  //         console.log("Magic link URL:", magicLinkUrl);

  //         // Redirect to magic link URL
  //         this.router.navigateByUrl(magicLinkUrl).then(nav => {
  //           console.log('Navigation to magic link:', nav);
  //           if (!nav) {
  //             console.error('Navigation to magic link failed.');
  //             this.forgotPasswordMessage = 'Failed to navigate to magic link. Please try again.';
  //           }
  //         });
  //       } else {
  //         console.error('Password recovery failed or magic token not received:', response.message);
  //         this.forgotPasswordMessage = response.message || 'Magic token not received. Please try again.';
  //       }
  //     },
  //     error => {
  //       console.error('An error occurred while requesting password recovery:', error);
  //       this.forgotPasswordMessage = 'An error occurred. Please try again later.';
  //     }
  //   );
  // }
  


  initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && typeof google.accounts !== 'undefined' && typeof google.accounts.id !== 'undefined') {
      // Initialize Google Sign-In
      google.accounts.id.initialize({
        client_id: '156115430884-qbtnhb5dlnn6fnqtj2k6vh7khol2p7e8.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleSignIn(response)
      });
      // Render Google Sign-In button in a hidden div
      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          theme: 'outline',
          size: 'large',
          promptParentId: 'googleSignInButton',
          prompt: 'select_account'
        }
      );
    } else {
      // Google API script might not be loaded yet; wait for it to load
      console.warn('Google API script is not fully loaded.');
    }
  }

  handleGoogleSignIn(response: any): void {
    const idToken = response.credential;
    const user = this.parseJwt(idToken);
    if (user) {
      console.log('Google login successful:', user);
      // Save user data or token as needed, for example:
      localStorage.setItem('authToken', idToken);
      console.log('Token saved in localStorage:', idToken); // <-- Logging statement
      let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-login'));
      if (modal) {
        modal.hide();
      }
      // this.router.navigate(['/Admin/Dashboard']);
    } else {
      console.error('Failed to decode Google ID token');
      this.invalidCred = 'Failed to log in with Google';
      this.showInvalidCredMessage();
    }
  }

  private parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to parse JWT:', error);
      return null;
    }
  }


//   editpassword():void  {
//     console.log("hiii ")
//   this.dialog.open(ConfirmPasswordComponent)
// }

openModal() {
  this.dialog.open(ConfirmPasswordComponent, {
    width:'500px',
    // data: { token: this.token }
  });
}
notverifyed()
{
  this.dialog.open(ConfirmPasswordComponent, {
    width:'500px',
    // data: { token: this.token }
  });
}

}

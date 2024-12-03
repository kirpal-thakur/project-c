import { Component,HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { environment } from '../../../../environments/environment';
import { ConfirmPasswordComponent } from '../SetPassword/confirmPassword.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDataService } from '../../../services/common-data.service';
declare var bootstrap: any; // Declare bootstrap
declare var google: any; // Declare google

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('invalidCredMessage') invalidCredMessage!: ElementRef;
  @ViewChild('registerForm') registerForm!: NgForm;

  isNavbarExpanded = false;
  isDarkMode: boolean = false;
  activeIndex: number = 1; // Default active tab
  role: number = 4; // Initialize role to 4 (Player)
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
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
  lang: string = '';
  token: string = '';
  tokenVerified: boolean = false;
  languages:any = environment.langs;
  selectedClub: number | null = null;
  selectedCountry: string = '';
  selectedTeam: number | null = null;
  companyName: string = '';
 //this is get by the domain
 countries: Array<{ code: string; name: string }> = [];
 clubs: Array<{ id: number; name: string }> = [];
  //clubs
  // clubs = [
  //   { id: 1, name: 'Club A' },
  //   { id: 2, name: 'Club B' },
  //   { id: 3, name: 'Club C' },
  //   { id: 4, name: 'Club D' },
  //   { id: 5, name: 'Club E' },
  // ];

  teams = [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Bravo' },
    { id: 3, name: 'Team Charlie' },
    { id: 4, name: 'Team Delta' },
    { id: 5, name: 'Team Echo' },
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
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 }
    },
    nav: true
  };

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    public dialog: MatDialog,
    private commonDataService: CommonDataService
  ) {}

  isScrolled = false;
  serverBusy = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Adjust the scroll value as needed
  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllClubs();
    this.lang = localStorage.getItem('lang') || 'en';
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
    this.applyTheme();

    this.route.queryParams.subscribe(params => {
      this.token = params['confirm-token'] || '';
      if (this.token) {
        this.authService.magicLogin(this.token).subscribe(
          response => {
            if (response.success) {
              this.tokenVerified = true;
              this.openModal();
            } else {
              this.tokenVerified = false;
              this.notVerified();
            }
          },
          error => {
            console.error('Error verifying token:', error);
            this.tokenVerified = false;
            this.notVerified();
          }
        );
      }
    });

    // Initialize Google Sign-In if available
    if (typeof google !== 'undefined' && google.accounts) {
      this.initializeGoogleSignIn();
    }
  }

  setActive(index: number): void {
    this.activeIndex = index; // Set the active index
    this.role = index === 1 ? 4 : index === 2 ? 2 : 3; // Update role based on activeIndex
  }

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
    document.body.classList.toggle('navbar-expanded', this.isNavbarExpanded);
  }

  toggleTheme(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isDarkMode = input.checked;
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
    this.applyTheme();
    this.themeService.toggleTheme();
  }

  applyTheme() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  ChangeLang(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;

    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
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
        if (response.status === false) {
          this.invalidCred = response.message;
          this.showInvalidCredMessage();
        } else {
          const token = response.data.token;
          const userData = response.data.user_data;
          const userRole = userData.role;
          let navigationRoute = '';
          switch (userRole) {
            case "2":
              navigationRoute = '/club/dashboard';
              break;
            case "3":
              navigationRoute = '/scout/dashboard';
              break;
            case "4":
              navigationRoute = '/talent/dashboard';
              break;
            case "1":
              navigationRoute = '/admin/dashboard';
              break;
            default:
              navigationRoute = '';
              break;
          }
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('userInfo', JSON.stringify(userData));

          let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-login'));
          if (modal) {
            modal.hide();
          }
          this.router.navigate([navigationRoute]);
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
    this.serverBusy = true;
    this.registerFormSubmitted = true;
    if (!this.isFormValid()) {
      this.serverBusy = false;
      console.error('Please fill in all required fields.');
      return;
    }
    const selectedLanguage = localStorage.getItem('lang') || '';
    const domain = environment.targetDomain?.domain || 'ch';

      // Retrieve the selected language code from localStorage
    const selectedLanguageSlug = localStorage.getItem('lang') || '';

    // Find the corresponding language ID from the langs array
    const selectedLanguageObj = this.languages.find(
      (lang:any) => lang.slug === selectedLanguageSlug
    );

    // Default to a specific language ID if none is found (e.g., English)
    const selectedLanguageId = selectedLanguageObj ? selectedLanguageObj.id : 1;

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
      lang: selectedLanguageId,
      domain: domain,
      club_id: this.selectedClub
    };

    this.authService.register(registrationData).subscribe(
      // response => {
      //   if (response.status === true) {
      //     this.serverBusy = false;
      //     bootstrap.Modal.getInstance(document.getElementById('exampleModal1'))?.hide();
      //     const loginModal = new bootstrap.Modal(document.getElementById('exampleModal-login'));
      //     loginModal.show();
      //   } else {
      //     console.log("status is false", response);
      //     this.serverBusy = false;
      //     this.registerError = typeof response.message === 'object'
      //       ? Object.values(response.message).join(' ')
      //       : response.message;
      //     this.registerFormSubmitted = false;
      //   }
      // },
      // error => {
      //   this.handleRegistrationError(error);
      // }

      response => {
        console.log('Registration response:', response);
        if (response.status === true) {
          this.serverBusy = false;
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

  private handleRegistrationError(error: any) {
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
      this.registerError = 'An error occurred during registration. Please try again.';
    }
    this.registerFormSubmitted = false;
  }

  
  isFormValid(): boolean {
    let fieldType = ['string', 'boolean'];
    return [
      this.firstName,
      this.lastName,
      this.username,
      this.email,
      this.password,
      this.confirmPassword,
      this.privacyPolicy
    ].every(field => fieldType.includes(typeof field)) &&
    this.role > 0 && // Assuming role should be a positive number
    this.language.trim() !== '' && // Ensure language is a non-empty string
    this.newsletter && // Ensure this boolean value is checked as needed
    this.userDomain.trim() !== ''; // Assuming userDomain is a string
  }

  forgotPassword() {
    if (!this.forgotPasswordEmail.trim()) {
      this.forgotPasswordMessage = 'Please provide a valid email address.';
      return;
    }

    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(
      response => {
        if (response.status === true) {
          const magicToken = response.data.magic_link_url;
          this.authService.magicLogin(`http://localhost:4200/Index?confirm-token=${magicToken}`).subscribe(
            magicLoginResponse => {
              if (magicLoginResponse.status === true) {
                this.router.navigate(['/Admin/Dashboard']);
              } else {
                this.forgotPasswordMessage = 'Auto-login failed. Please try again.';
              }
            },
            () => {
              this.forgotPasswordMessage = 'An error occurred during auto-login. Please try again later.';
            }
          );
        } else {
          this.forgotPasswordMessage = response.message;
        }
      },
      () => {
        this.forgotPasswordMessage = 'An error occurred. Please try again later.';
      }
    );
  }

  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: 'YOUR_CLIENT_ID',
      callback: (response: any) => this.handleGoogleSignIn(response)
    });
    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {
        theme: 'outline',
        size: 'large',
        prompt: 'select_account'
      }
    );
  }

  handleGoogleSignIn(response: any): void {
    const idToken = response.credential;
    if (idToken) {
      localStorage.setItem('authToken', idToken);
      let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-login'));
      if (modal) {
        modal.hide();
      }
      this.router.navigate(['/Admin/Dashboard']);
    } else {
      this.invalidCred = 'Failed to log in with Google';
      this.showInvalidCredMessage();
    }
  }

  openModal() {
    this.dialog.open(ConfirmPasswordComponent, { width: '500px' });
  }

  notVerified() {
    this.dialog.open(ConfirmPasswordComponent, { width: '500px' });
  }


  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value;
    console.log('Selected Country:', this.selectedCountry);
  }

  onClubChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedClub = +selectElement.value; // Convert to number
    console.log('Selected Club ID:', this.selectedClub);
  }

  onTeamChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTeam = +selectElement.value; // Convert to number
    console.log('Selected Team ID:', this.selectedTeam);
  }
  onCompanyNameChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.companyName = inputElement.value;
    console.log('Company Name:', this.companyName);
  }

  // isNavbarExpanded = false;

  // toggleNavbar() {
  //   this.isNavbarExpanded = !this.isNavbarExpanded;
  // }

  closeNavbar() {
    this.isNavbarExpanded = false;
  }


  getAllCountries(){
    this.commonDataService.getAllCountries().subscribe((resp) => {
      this.countries = resp.data.domains.map((country: any) => ({
        code: country.domain_country_code || '',
        name: country.location || ''
      }));
    });
  }

  getAllClubs(){
    this.commonDataService.getAllClubs().subscribe((resp) => {
      this.clubs = resp.data.clubs.map((club: any) => ({
        id: club.id || '',
        name: club.club_name || ''
      }));
      console.log(resp, 'club-resp');
    });
  }

}

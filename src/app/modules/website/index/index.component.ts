import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { environment } from '../../../../environments/environment';

declare var bootstrap: any; // Declare bootstrap
declare var google: any; // Declare google

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{
  @ViewChild('invalidCredMessage') invalidCredMessage!: ElementRef;
  @ViewChild('registerForm') registerForm!: NgForm; // Define registerForm using ViewChild



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

  constructor(private themeService: ThemeService,private authService: AuthService, private router: Router, private translateService: TranslateService) {}

  lang:string = '';

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en'
      // Check if the google.accounts.id library is loaded
      if (typeof google !== 'undefined' && typeof google.accounts !== 'undefined' && typeof google.accounts.id !== 'undefined') {
        // Initialize Google Sign-In
        this.initializeGoogleSignIn();
      } else {
        // Google API script might not be loaded yet; wait for it to load
        console.warn('Google API script is not fully loaded.');
      }
  }

  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage)
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
        if (response.status === true) {
          const magicLinkUrl = response.data.magic_link_url;
          this.authService.magicLogin(magicLinkUrl).subscribe(
            magicLoginResponse => {
              console.log('Magic login response:', magicLoginResponse);
              if (magicLoginResponse.status === true) {
                console.log('Auto-login successful.');
                this.router.navigate(['/Admin/Dashboard']);
              } else {
                console.error('Auto-login failed:', magicLoginResponse.message);
                this.forgotPasswordMessage = 'Auto-login failed. Please try again.';
              }
            },
            magicLoginError => {
              console.error('An error occurred during auto-login:', magicLoginError);
              this.forgotPasswordMessage = 'An error occurred during auto-login. Please try again later.';
            }
          );
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
      this.router.navigate(['/Admin/Dashboard']);
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

}

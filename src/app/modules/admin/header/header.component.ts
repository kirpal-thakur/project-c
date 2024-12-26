import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { SocketService } from '../../../services/socket.service';
import { goToActiveLog } from '../../../../utlis';
import { SharedService } from '../../../services/shared.service';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, switchMap, finalize } from 'rxjs/operators';

interface Notification {
  image: string;
  title: string;
  content: string;
  time: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //constructor(private themeService: ThemeService) {}
  constructor(private shareService:  SharedService, private userService: UserService, private themeService: ThemeService, private authService: AuthService, private router: Router, private translateService: TranslateService, private socketService: SocketService) { }
  loggedInUser: any = localStorage.getItem('userData');
  profileImgUrl: any = "";
  lang: string = '';
  domains: any = environment.domains; 

  languages: any = localStorage.getItem('languages');
  liveNotification: any[] = [];
  showNotification: boolean = false;
  notificationCount: number = 0;
  isShowAllNotification : boolean = false;
  language : any;

  searchResults: any[] = [];
  searchUser: any;
  showSuggestions: boolean = false;
  searchControl = new FormControl('');
  filteredUsers: any[] = [];
  isLoading: boolean = false; // Flag to track loading state

  ngOnInit() {
    this.languages = JSON.parse(this.languages);

    this.socketService.on('notification').subscribe((data) => {
      this.notificationCount += 1;
      // Create a new notification object
      const obj = {
        image: data.senderProfileImage,
        title: data.senderName,
        content: data.message,
        time: 'just now'
      };

      // Add the notification to the array and show the notification box
      this.liveNotification.push(obj); // Keep only the latest notification
      this.showNotification = true;
    });

    this.userService.adminImageUrl.subscribe((newUrl) => {
      console.log(newUrl, 'testing...', this.loggedInUser.profile_image_path)
      if (newUrl == 'default') {
        if (this.loggedInUser.profile_image_path) {
          this.profileImgUrl = this.loggedInUser.profile_image_path;
        } else {
          this.profileImgUrl = "../../../assets/images/1.jpg";
        }
      }

      this.loggedInUser = JSON.parse(this.loggedInUser);
      if (this.loggedInUser.profile_image_path) {
        this.profileImgUrl = this.loggedInUser.profile_image_path;
      } else {
        this.profileImgUrl = "../../../assets/images/1.jpg";
      }

      this.lang = localStorage.getItem('lang') || 'en';

      const selectedLanguage = this.domains.find((lang:any) => lang.slug === this.lang);
      if (selectedLanguage) {
        this.language = selectedLanguage;
      }else{
        this.language = this.domains[0];
      }

      this.updateThemeText();

      this.socketService.on('notification').subscribe((data) => {
        // Create a new notification object
        const obj = {
          image: data.senderProfileImage,
          title: data.senderName,
          content: data.message,
          time: 'just now'
        };

        // Add the notification to the array and show the notification box
        this.liveNotification = [obj]; // Keep only the latest notification
        this.showNotification = true;

        console.log('New notification:', data.message);

        // Hide the notification after 3 seconds
        setTimeout(() => {
          this.liveNotification = [];
          this.showNotification = false;
        }, 7000); // 3000 ms = 3 seconds
      });
    });


    this.searchControl.valueChanges
    .pipe(
      filter((value): value is string => value !== null && value.trim().length > 0), // Exclude null or empty strings
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText: string) => {
        this.isLoading = true;
        return this.userService.searchUser(searchText).pipe(
          finalize(() => (this.isLoading = false))
        );
      })
    )
    .subscribe(
      (response: any) => {
        if (response && response.status && response.data?.userData) {
          this.filteredUsers = response.data.userData;
        } else {
          console.error('Invalid API response structure:', response);
          this.filteredUsers = [];
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.filteredUsers = [];
      }
    );

    this.userService.getAdminProfile().subscribe((response)=>{
      if (response && response.status) {
        let userData = response.data.user_data;
        // this.firstName = this.userData.first_name || '';
        // this.lastName = this.userData.last_name || '';
        // this.email = this.userData.username || '';
        // this.contactNumber = this.userData.meta.contact_number || '';
        // this.address = this.userData.meta.address || '';
        // this.city = this.userData.meta.city || '';
        // this.state = this.userData.meta.state || '';
        // this.zipcode = this.userData.meta.zipcode || '';
        this.profileImgUrl = userData.meta.profile_image_path || '../../../assets/images/1.jpg';
        // this.isLoading = false;
        
      } else {
        console.error('Invalid API response structure:', response);
      }
    }); 
  }

  ChangeLang(lang: any) {

    const selectedLanguage = typeof lang != 'string' ? lang.target.value : lang;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage)

    // Retrieve the selected language code from localStorage
    const selectedLanguageSlug = selectedLanguage;
    // Find the corresponding language ID from the langs array
    const selectedLanguageObj = this.languages.find(
      (lang: any) => lang.slug === selectedLanguageSlug
    );

    // Default to a specific language ID if none is found (e.g., English)
    const selectedLanguageId = selectedLanguageObj ? selectedLanguageObj.id : 1;
    localStorage.setItem('lang_id', selectedLanguageId);
    this.shareService.updateData({
      action:'lang_updated',
      id:selectedLanguageId
    })

  }


  logout() {
    this.authService.logout();
  }

  themeText: string = 'Light Mode'

  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
    this.updateThemeText()
  }

  updateThemeText() {
    const isDarkMode = this.themeService.isDarkMode();
    this.themeText = isDarkMode ? 'Dark Mode ' : 'Light Mode'
    document.getElementById('theme-text')!.textContent = this.themeText
  }


  onSearch() {
    if (this.searchUser.trim().length === 0) {
      this.searchResults = [];
      return;
    }

    this.userService.searchUser(this.searchUser).subscribe((response: any) => {
      if (response && response.status && response.data && response.data.userData) {
        this.searchResults = response.data.userData;
      } else {
        // this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
    });
  }


  selectUser(user: any): void {

    this.searchControl.setValue(`${user.first_name} ${user.last_name}`, {
      emitEvent: false,
    });

    this.filteredUsers = [];
    // Navigate or perform actions with the selected user
    this.exploreUser(user.role_name, user.id);
  }

  exploreUser(slug:string, id:Number): void {
    let pageRoute = 'admin/'+slug.toLowerCase();
    this.router.navigate([pageRoute, id]);
  }


  toggleSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }

  closeSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }

  notifications: Notification[] = [
    {
      image: '../../../assets/images/1.jpg',
      title: 'Elton Price',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      time: '14 hours ago'
    }
  ];

  loadMoreNotifications() {
    
    // const moreNotifications: Notification[] = [
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '13 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '12 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '12 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '11 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '10 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '10 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '9 hours ago'
    //   },
    //   {
    //     image: '../../../assets/images/1.jpg',
    //     title: 'John Doe',
    //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //     time: '18 hours ago'
    //   }
    // ];

    localStorage.setItem('makeActiveTab', 'activity');
    setTimeout(() => {
      this.router.navigate(['/admin/setting']);
    }, 1000);
    this.isShowAllNotification = true;
    this.liveNotification = this.liveNotification;
    // Hide the notification after 3 seconds
    setTimeout(() => {
      this.liveNotification = [];
      this.showNotification = false;
      this.notificationCount = 0;
      this.isShowAllNotification = false;
    }, 5000); // 3000 ms = 3 seconds

  }

  accountSetting(){
    goToActiveLog(this.router);
  }
}


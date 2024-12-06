import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TalentService } from '../../../services/talent.service';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { SocketService } from '../../../services/socket.service';
import { map,filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, finalize } from 'rxjs/operators';

interface Notification {
  image: string;
  title: string;
  content: string;
  time: string;
}

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  currentPageName: string = ''; // Variable to store current page name
  searchResults: any[] = [];
  searchUser: any;
  showSuggestions: boolean = false;
  viewsTracked: { [profileId: string]: { viewed: boolean, clicked: boolean } } = {}; // Track view and click per profile

  constructor(private userService: UserService, private router: Router,private route: ActivatedRoute, private talentService: TalentService, private themeService: ThemeService, private authService: AuthService, private translateService: TranslateService, private socketService: SocketService) { }
  loggedInUser: any = localStorage.getItem('userInfo');
  profileImgUrl: any = "";
  lang: string = '';
  domains: any = environment.domains;
  message: string = '';
  isLoading: boolean = false; // Flag to track loading state
  language : any;
  liveNotification: any[] = [];
  showNotification: boolean = false;

  searchControl = new FormControl('');
  filteredUsers: any[] = [];

  ngOnInit() {
    this.loggedInUser = JSON.parse(this.loggedInUser);

    this.profileImgUrl = this.loggedInUser.profile_image_path;

    this.talentService.message$.subscribe(msg => {
      this.profileImgUrl = msg;
    });

    this.lang = localStorage.getItem('lang') || 'en'

    const selectedLanguage = this.domains.find((lang:any) => lang.slug === this.lang);
    if (selectedLanguage) {
      this.language = selectedLanguage;
    }else{
      this.language = this.domains[0];
    }
    console.log(this.language);

    this.updateThemeText();

    this.socketService.on('notification').subscribe((data) => {
      // Create a new notification object
      console.log(data);
      const obj = {
        image: data.senderProfileImage,
        title: data.senderId,
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
      }, 5000); // 5000 ms = 5 seconds
    });

    //   this.router.events
    //   .pipe(
    //     filter(event => event instanceof NavigationEnd), // Ensure only navigation events are handled
    //     map(() => {
    //       const child = this.route.firstChild;
    //       return child?.snapshot.data['title'] || 'Home'; // Default title if no data
    //     })
    //   )
    //   .subscribe((title: string) => {
    //     this.currentPageName = title; // Assign the title to `currentPageName`
    //   });

    // }

      // Set the page name for the initial load
      this.setPageTitleFromRoute();

      // Listen for route changes and update the title
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd), // Ensure only navigation events are handled
        map(() => this.route.firstChild?.snapshot.data['title'] || 'Home') // Default to 'Home' if no title
      )
      .subscribe((title: string) => {
        this.currentPageName = title;
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
  }

  // Method to set the page title on the initial load
  private setPageTitleFromRoute() {
    const childRoute = this.route.firstChild;
    if (childRoute && childRoute.snapshot.data['title']) {
      this.currentPageName = childRoute.snapshot.data['title'];
    } else {
      this.currentPageName = 'Home'; // Default to 'Home' if no title found
    }
  }
  navigateToTab(tab: string) {
    this.router.navigate(['/talent/setting'], { fragment: tab === 'setting' ? 'app-settings' : 'activity' });
  }


  ChangeLang(lang: any) {
    const selectedLanguage = typeof lang != 'string' ? lang.target.value : lang;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage)
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
    const moreNotifications: Notification[] = [
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '13 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '12 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '12 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '11 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '10 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '10 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '9 hours ago'
      },
      {
        image: '../../../assets/images/1.jpg',
        title: 'John Doe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '18 hours ago'
      }
    ];

    this.notifications = [...this.notifications, ...moreNotifications];

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

  exploreUser(slug: string, id: number): void {
    this.trackProfileClick(id);
    const pageRoute = `view/${slug.toLowerCase()}`;
    this.router.navigate([pageRoute, id]);
  }

  private trackProfileClick(profileId: number): void {
    const id: number[] = [profileId];
    if (!this.viewsTracked[profileId]?.clicked) {
      this.talentService
        .trackProfiles(this.loggedInUser.id, id, 'click')
        .subscribe({
          next: () => {
            console.log(`Click tracked for profile ${profileId}`);
            this.viewsTracked[profileId] = {
              ...this.viewsTracked[profileId],
              clicked: true,
            };
            this.saveTrackedViews();
          },
          error: (error) =>
            console.error('Error tracking profile click', error),
        });
    }
  }

  private saveTrackedViews(): void {
    sessionStorage.setItem('viewsTracked', JSON.stringify(this.viewsTracked));
  }
}
import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { TalentService } from '../../../services/talent.service';
import { SocketService } from '../../../services/socket.service';

interface Notification {
  image: string;
  title: string;
  content: string;
  time: string;
}

@Component({
  selector: 'talent-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchResults: any[] = [];
  showSuggestions: boolean = false;

  constructor(private userService: UserService, private talentService: TalentService, private themeService: ThemeService, private authService: AuthService, private router: Router,private translateService: TranslateService, private socketService: SocketService) {}
  loggedInUser:any = localStorage.getItem('userInfo');
  profileImgUrl: any = "";
  lang:string = '';
  domains: any = environment.domains;
  message: string = '';

  liveNotification: any[] = [];
  showNotification: boolean = false;
  notificationCount: number = 0;
  isShowAllNotification : boolean = false

  ngOnInit() {
    this.loggedInUser = JSON.parse(this.loggedInUser);

    this.profileImgUrl = this.loggedInUser.meta.profile_image_path;

    this.talentService.message$.subscribe(msg => {
      this.profileImgUrl = msg;
    });
    
    
    this.lang = localStorage.getItem('lang') || 'en'
    this.updateThemeText();
    this.socketService.on('notification').subscribe((data) => {
      this.notificationCount +=1;
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


  onSearch(query: string) {
    if (query.trim().length === 0) {
      this.searchResults = [];
      return;
    }

    this.userService.searchUser(query).subscribe(
      (results: any[]) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error fetching user suggestions:', error);
      }
    );
  }

  selectUser(user: any) {
    console.log('User selected:', user);
    this.searchResults = [];
    this.showSuggestions = false;
    // Navigate or perform actions with the selected user
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // Delay to ensure selectUser runs before hiding suggestions
  }
}


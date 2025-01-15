import { ProfileTabComponent } from './../../talent/tabs/profile-tab/profile-tab.component';
import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScoutService } from '../../../services/scout.service';

interface Notification {
  image: string;
  title: string;
  content: string;
  time: string;
}

@Component({
  selector: 'scout-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //constructor(private themeService: ThemeService) {}
  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router,private translateService: TranslateService, private scoutService: ScoutService) {}
  lang:string = '';
  getUserId:any;

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en'
    this.updateThemeText();
    this.getUserId = localStorage.getItem('userData');
    console.log(localStorage.getItem('userData'), 'user-data');
    setTimeout(() => {
      this.getUserProfile();
    }, 3000);
  }

  ChangeLang(lang:any){
    const selectedLanguage = typeof lang != 'string' ? lang.target.value: lang;
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

  updateThemeText (){
    const isDarkMode = this.themeService.isDarkMode();
    this.themeText = isDarkMode ? 'Dark Mode ' : 'Light Mode'
    document.getElementById('theme-text')!.textContent =this.themeText
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

  getUserProfile(){
    console.log(this.getUserId['id'], 'get-user-id');
    // this.scoutService.getProfileData().subscribe()
  }

}


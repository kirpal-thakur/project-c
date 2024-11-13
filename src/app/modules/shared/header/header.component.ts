import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TalentService } from '../../../services/talent.service';
import { environment } from '../../../../environments/environment';

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
  
  constructor(private talentService: TalentService, private themeService: ThemeService, private authService: AuthService,private translateService: TranslateService) {}
  loggedInUser:any = localStorage.getItem('userInfo');
  profileImgUrl: any = "";
  lang:string = '';
  domains: any = environment.domains;
  message: string = '';

  ngOnInit() {
    this.loggedInUser = JSON.parse(this.loggedInUser);

    this.profileImgUrl = this.loggedInUser.meta.profile_image_path;

    this.talentService.message$.subscribe(msg => {
      this.profileImgUrl = msg;
    });
    
    
    this.lang = localStorage.getItem('lang') || 'en'
    this.updateThemeText();
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

}


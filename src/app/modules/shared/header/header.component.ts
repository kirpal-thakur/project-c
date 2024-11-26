import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TalentService } from '../../../services/talent.service';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';

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
  
  searchResults: any[] = [];
  searchUser:any;
  showSuggestions: boolean = false;
  viewsTracked: { [profileId: string]: { viewed: boolean, clicked: boolean } } = {}; // Track view and click per profile

  constructor(private userService: UserService ,private router: Router,private talentService: TalentService, private themeService: ThemeService, private authService: AuthService,private translateService: TranslateService) {}
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

  onSearch() {

    if (this.searchUser.trim().length === 0) {
      this.searchResults = [];
      return;
    }

    this.userService.searchUser(this.searchUser).subscribe((response:any)=>{
      if (response && response.status && response.data && response.data.userData) {          
          this.searchResults = response.data.userData;          
      } else {
        // this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
    });  

  }

  selectUser(user: any) {
    console.log('User selected:', user);
    this.searchResults = [];
    this.showSuggestions = false;
    this.searchUser = user.first_name +' '+ user.last_name

    // Navigate or perform actions with the selected user
    this.exploreUser(user.role_name,user.id)
  }

  
  private saveTrackedViews() {
    sessionStorage.setItem('viewsTracked', JSON.stringify(this.viewsTracked));
  }

  // Track profile click only once per session
  private trackProfileClick(profileId: number) {
    const id: number[] = [profileId];  // Create an array of profileId

    if (!this.viewsTracked[profileId]?.clicked) {
      this.talentService.trackProfiles(this.loggedInUser.id, id, 'click').subscribe({
        next: () => {
          console.log(`Click tracked for profile ${profileId}`);
          this.viewsTracked[profileId] = { ...this.viewsTracked[profileId], clicked: true };
          this.saveTrackedViews();  // Save the updated viewsTracked
        },
        error: (error) => console.error('Error tracking profile click', error)
      });
    }
  }

  exploreUser(slug: string, id: number): void {
    this.trackProfileClick(id); // Track the click before navigation
    const pageRoute = 'view/' + slug.toLowerCase();
    this.router.navigate([pageRoute, id]);
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // Delay to ensure selectUser runs before hiding suggestions
  }

}


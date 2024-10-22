// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Project-c';
  ngOnInit() {
    // Check if the logout message flag is set
    const logoutMessage = localStorage.getItem('logoutMessage');
    if (logoutMessage) {
      console.log('Token successfully removed from local storage.');

      // Clear the message after 10 seconds
      setTimeout(() => {
        console.clear();
        localStorage.removeItem('logoutMessage');
      }, 10000);
    }
  }

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en'); // Set default language
    this.translateService.use(localStorage.getItem('lang') || 'en')
  }
}

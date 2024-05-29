import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'theme';
  private readonly darkThemeClass = 'dark-theme';

  constructor() {
    this.loadTheme();
   }


   private loadTheme() {
    const theme = localStorage.getItem(this.themeKey);
    if (theme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
    }
  }

  toggleTheme() {
    const body = document.body;
    if (body.classList.contains(this.darkThemeClass)) {
      body.classList.remove(this.darkThemeClass);
      localStorage.setItem(this.themeKey, 'light');
    } else {
      body.classList.add(this.darkThemeClass);
      localStorage.setItem(this.themeKey, 'dark');
    }
  }
}


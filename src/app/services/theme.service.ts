import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode: boolean = false;
  private readonly themeKey = 'theme';
  private readonly darkThemeClass = 'dark-theme';
  private readonly lightThemeClass = 'light-theme';

  constructor() {
    this.loadTheme();
   }


   private loadTheme() {
    const theme = localStorage.getItem(this.themeKey);
    if (theme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
    }else{
      document.body.classList.add(this.lightThemeClass);
    }
  }

  toggleTheme() {

    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);

    const body = document.body;
    if (body.classList.contains(this.darkThemeClass)) {
      body.classList.add(this.lightThemeClass);
      body.classList.remove(this.darkThemeClass);
      localStorage.setItem(this.themeKey, 'light');
    } else {
      body.classList.add(this.darkThemeClass);
      body.classList.remove(this.lightThemeClass);
      localStorage.setItem(this.themeKey, 'dark');
    }
  }
  
  isDarkMode(): boolean {
    return this.darkMode;
  }
}


import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }


  toggleSidebar() {
    console.log('Toggle state function called');
    document.body.classList.toggle('small-screen-sidebar-active');
  }

  closeSidebar() {
    document.body.classList.toggle('small-screen-sidebar-active');
  }
}

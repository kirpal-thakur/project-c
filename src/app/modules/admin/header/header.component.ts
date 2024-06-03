import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

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
    document.body.classList.toggle('mobile-sidebar-active');
  }

  closeSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }
}

import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }


  toggleSidebar(event: Event) {
    event.stopPropagation();
    document.body.classList.toggle('small-screen-sidebar-active');
  }

  toggleState(event: Event) {
    
    event.stopPropagation();
    document.body.classList.toggle('compact-sidebar');
  }
  closeSidebar() {
    document.body.classList.toggle('small-screen-sidebar-active');
  }
}

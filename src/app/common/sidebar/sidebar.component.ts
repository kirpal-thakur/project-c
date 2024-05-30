import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  toggleSidebar(event: Event) {
    event.stopPropagation();
    document.body.classList.toggle('small-screen-sidebar-active');
  }

  toggleState() {
    console.log('Toggle state function called');
    document.body.classList.toggle('compact-sidebar');
  }
  closeSidebar() {
    document.body.classList.toggle('small-screen-sidebar-active');
  }
}

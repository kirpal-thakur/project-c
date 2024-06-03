import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  toggleState() {
    document.body.classList.toggle('compact-sidebar');
  }
  closeSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }
}

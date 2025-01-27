import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'talent-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarOpen: boolean = false; // Initial state of the sidebar

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  toggleState(): void {
    this.sidebarOpen = !this.sidebarOpen; // Toggles the sidebar state

    // Update body classes based on sidebar state
    if (this.sidebarOpen) {
      document.body.classList.remove('compact-sidebar');
      document.body.classList.add('mobile-sidebar-active');
    } else {
      document.body.classList.add('compact-sidebar');
      document.body.classList.remove('mobile-sidebar-active');
    }
  }
}

 import { Component, OnInit} from '@angular/core';
 import { SocketService } from '../../../services/socket.service';

 @Component({
   selector: 'talent-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrl: './sidebar.component.scss'
})
 export class SidebarComponent {
  sidebarOpen: boolean = false;
  // notificationCount: number = 0;
  // constructor( private socketService: SocketService) { }
  // ngOnInit() {
  //   this.socketService.on('notification').subscribe((data) => {
  //     this.notificationCount +=1;

  //     setTimeout(() => {
  //       this.notificationCount = 0;
  //     });
  //   });
  // }

 toggleState() {
  this.sidebarOpen = !this.sidebarOpen;

  // Toggle classes on body element
  if (this.sidebarOpen) {
    document.body.classList.remove('compact-sidebar');
    document.body.classList.add('mobile-sidebar-active');
  } else {
    document.body.classList.add('compact-sidebar');
    document.body.classList.remove('mobile-sidebar-active');
  }
}

closeSidebar() {
  this.sidebarOpen = false;
  document.body.classList.remove('mobile-sidebar-active');
  document.body.classList.add('compact-sidebar');
}
 }

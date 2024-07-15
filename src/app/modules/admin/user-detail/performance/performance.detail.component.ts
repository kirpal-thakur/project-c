import { Component } from '@angular/core';

@Component({
  selector: 'app-user-performance',
  templateUrl: './performance.detail.component.html',
  styleUrl: './performance.detail.component.scss'
})
export class PerformanceDetailComponent {
  isEditing: boolean = false;

  startEditing(): void {
    this.isEditing = true;
  }

  stopEditing(): void {
    this.isEditing = false;
  }
}

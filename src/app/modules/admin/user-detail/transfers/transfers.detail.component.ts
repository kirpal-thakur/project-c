import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-transfers',
  templateUrl: './transfers.detail.component.html',
  styleUrl: './transfers.detail.component.scss',
})
export class TransfersDetailComponent {
  date = new FormControl(new Date());
}
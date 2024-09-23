import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss'
})
export class MembershipComponent {
  selectedIds: number[] = []; // Initialize selectedIds array

  plans = [
    { id: 1, name: 'Basic', price: 9.99, features: ['Feature 1', 'Feature 2'] },
    { id: 2, name: 'Pro', price: 19.99, features: ['Feature 1', 'Feature 2'] },
  ];

  transactions = [
    { id: 1, date: new Date(), amount: 9.99, status: 'Completed' },
    { id: 2, date: new Date(), amount: 19.99, status: 'Pending' },
  ];

  subscribe(plan: any) {
    console.log(`Subscribed to: ${plan.name}`);
  }
}

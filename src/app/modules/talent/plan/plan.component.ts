import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TalentService } from '../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: TalentService, public dialog: MatDialog,private router: Router) { }

  plans = [
    { 
      name: 'Premium', 
      priceMonthly: 517, 
      priceYearly: 490, 
      currency: 'CHF', 
      isYearly: false, // Each plan manages its own billing period
      quantity: 1,
      includes: ['Talent profile', 'Export data', 'Chat with talents', 'Favorite list', 'Highlight photos/videos']
    },
    { 
      name: 'Standard', 
      priceMonthly: 350, 
      priceYearly: 330, 
      currency: 'CHF',
      isYearly: false, // Billing period toggle for Standard
      quantity: 1,
      includes: ['Talent profile', 'Export data', 'Chat with talents', 'Favorite list', 'Highlight photos/videos']
    },
    { 
      name: 'Basic', 
      priceMonthly: 250, 
      priceYearly: 230, 
      currency: 'CHF',
      isYearly: false, // Billing period toggle for Basic
      quantity: 1,
      includes: ['Talent profile', 'Export data', 'Chat with talents', 'Favorite list', 'Highlight photos/videos']
    },
  ];

  
  editPlanPopup(id:any) {

    const dialogRef = this.dialog.open(EditPlanComponent, {
      width: '800px',
      data: {
        invoice_number: '',
        category: '',
        plan: '',
        duration: '',
        valid_until: '',
        price: '',
        subtotal: '',
        total: '',
        currency : '',
        downlaod_path: '',
      }
    });

  }

  maxQuantity: number = 10;

  ngOnInit() {}

  toggleMonthly(plan: any) {
    plan.isYearly = false;
  }

  toggleYearly(plan: any) {
    plan.isYearly = true;
  }

  decreaseValue(plan: any) {
    plan.quantity = Math.max(plan.quantity - 1, 1);
  }

  increaseValue(plan: any) {
    plan.quantity = Math.min(plan.quantity + 1, this.maxQuantity);
  }

  handleQuantityChange(event: any, plan: any) {
    let value = parseInt(event.target.value);
    plan.quantity = isNaN(value) ? 1 : value;
  }
}

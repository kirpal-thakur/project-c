import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-membership-profile',
  templateUrl: './edit-membership-profile.component.html',
  styleUrls: ['./edit-membership-profile.component.scss'] // Fixed to 'styleUrls'
})
export class EditMembershipProfileComponent {
  
  @Input() profileImage: string = '';
  @Input() audiences: any[] = [];
  @Input() totalViews: number = 0;
  @Input() totalClicks: number = 0;

  selectedAudiences: number[] = [];

  constructor() { }

  pauseBoost() {
    // Logic to pause the boost
    console.log('Boost paused');
  }

  saveBoost() {
    // Logic to save and boost the profile
    console.log('Boost saved with audiences: ', this.selectedAudiences);
  }

  // Method to handle checkbox change and update the selectedAudiences array
  toggleAudienceSelection(audienceId: number, event: any) {
    if (event.target.checked) {
      this.selectedAudiences.push(audienceId);
    } else {
      this.selectedAudiences = this.selectedAudiences.filter(id => id !== audienceId);
    }
  }
}

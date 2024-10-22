import { Component } from '@angular/core';
import { TalentService } from '../../../../services/talent.service';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrl: './app-setting.component.scss'
})
export class AppSettingComponent {
  loggedInUser: any = localStorage.getItem('userData');

  constructor(private talentService: TalentService) {}

  ngOnInit() {
    // Parse the localStorage value into JSON format
    this.loggedInUser = JSON.parse(this.loggedInUser);
  }

  // Update newsletter subscription
  onNewsletterChange(event: any) {
    let newsletter = event.target.checked ? 1 : 0;

    // Call the API to update the newsletter status
    this.talentService.updateNewsletter({ newsletter }).subscribe(
      (response) => {
        if (response && response.status && response.data) {          
          // Update local storage only if the API call is successful
          this.loggedInUser.newsletter = newsletter;
          localStorage.setItem('userData', JSON.stringify(this.loggedInUser));
        } else {
          console.error('Invalid API response structure:', response);
        }
      },
      (error) => {
        console.error('Error updating newsletter subscription:', error);
      }
    );
  }
}
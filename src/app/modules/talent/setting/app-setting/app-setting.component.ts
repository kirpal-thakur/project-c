import { Component } from '@angular/core';
import { TalentService } from '../../../../services/talent.service';
import { eventNames } from 'process';
import { MessagePopupComponent } from '../../message-popup/message-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrl: './app-setting.component.scss'
})
export class AppSettingComponent {
  loggedInUser: any = localStorage.getItem('userData');

  constructor(private talentService: TalentService , public dialog: MatDialog){}

  ngOnInit() {
    // Parse the localStorage value into JSON format
    this.loggedInUser = JSON.parse(this.loggedInUser);
  }


  showMatDialog(message:string, action:string,data:any){
    const messageDialog = this.dialog.open(MessagePopupComponent,{
      width: '500px',
      position: {
        top:'150px'
      },
      data: {
        message: message,
        action: action
      }
    })

    messageDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.action == "delete-confirmed") {
          this.onNewsletterChange(data);
        } else {
          // Reset the checkbox state if the user cancels
          data.target.checked = !data.target.checked;
        }
      }
    });
  }

  confirm(event:any){
    this.showMatDialog("Are you sure you want to change newsletter status?", "newsletter-confirmation",event);
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
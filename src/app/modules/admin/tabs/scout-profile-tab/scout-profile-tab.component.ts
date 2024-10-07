import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UserEditPopupComponent } from '../../user-edit-popup/user-edit-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../../message-popup/message-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scout-profile-tab',
  templateUrl: './scout-profile-tab.component.html',
  styleUrl: './scout-profile-tab.component.scss'
})
export class ScoutProfileTabComponent {

  user:any = {}
  userNationalities:any = [];

  @Input() userData: any;
  @Output() dataEmitter = new EventEmitter<string>();
  constructor(public dialog: MatDialog, private router: Router) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData']) {
      if(changes['userData'].currentValue.user_nationalities){
        this.userNationalities = JSON.parse(this.userData.user_nationalities);
      }
    }
  }

  editScout(data:any){
    const dialog = this.dialog.open(UserEditPopupComponent,{
      height: '598px',
      width: '600px',
      data : {
        role: 'scout',
        data:data
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(result.action == "updated"){
          this.dataEmitter.emit('updated');
          this.showMatDialog("Scout updated successfully.",'display');
        }
      //  console.log('Dialog result:', result);
      }
    });
  }

  showMatDialog(message:string, action:string){
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
  }
}

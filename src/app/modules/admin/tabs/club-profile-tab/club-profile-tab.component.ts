import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UserEditPopupComponent } from '../../user-edit-popup/user-edit-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../../message-popup/message-popup.component';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-club-profile-tab',
  templateUrl: './club-profile-tab.component.html',
  styleUrl: './club-profile-tab.component.scss'
})
export class ClubProfileTabComponent {
  user:any = {}
  userNationalities:any = [];
  representators:any = [];
  userId:any = "";
  baseUrl:any = "";
  @Input() userData: any;
  @Output() dataEmitter = new EventEmitter<string>();
  constructor(public dialog: MatDialog, private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData']) {
      this.userId = this.userData?.id
      if(this.userId && this.userId != ""){
        this.getRepresentators();
      }
      if(changes['userData'].currentValue.user_nationalities){
        this.userNationalities = JSON.parse(this.userData.user_nationalities);
      }
    }
  }

  getRepresentators(){
    this.userService.getRepresentators(this.userId).subscribe((response)=>{
      if (response && response.status && response.data) {
        this.representators = response.data.representators;
        this.baseUrl = response.data.uploads_path
      } else {
        console.error('Invalid API response structure:', response);
      }
    });
  }

  getMetaValue(stringifyData:any, key:any):any{
    if(stringifyData){
      stringifyData = JSON.parse(stringifyData);
      if(stringifyData[key]){
        return stringifyData[key];
      }else{
        return "NA";
      }
    }else{
      return "NA";
    }
  }

  editClub(data:any){
    const dialog = this.dialog.open(UserEditPopupComponent,{
      height: '598px',
      width: '600px',
      data : {
        role: 'club',
        data:data
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(result.action == "updated"){
          this.dataEmitter.emit('updated');
          this.showMatDialog("Club updated successfully.",'display');
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

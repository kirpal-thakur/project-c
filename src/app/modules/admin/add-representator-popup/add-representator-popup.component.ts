import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-representator-popup',
  templateUrl: './add-representator-popup.component.html',
  styleUrl: './add-representator-popup.component.scss'
})
export class AddRepresentatorPopupComponent {

  userId:any = ""
  email:any = "";
  role:any = "";

  firstName:any = "";
  lastName:any = "";
  designation:any = "";
  idToUpdate:any = "";
  constructor(private userService: UserService,private route: ActivatedRoute, public dialogRef : MatDialogRef<AddRepresentatorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
      this.userId = data.userId;

      if(data.action == "edit"){
        this.idToUpdate = data.representator.id; 
        this.firstName = data.representator.first_name;
        this.lastName = data.representator.last_name;
        this.designation = this.getMetaValue(data.representator?.meta, 'designation');
      }
  }

  
  getMetaValue(stringifyData:any, key:any):any{
    console.log(stringifyData)
    if(stringifyData){
      stringifyData = JSON.parse(stringifyData);
      if(stringifyData[key]){
        return stringifyData[key];
      }else{
        return "";
      }
    }else{
      return "";
    }
  }
  close(): void {
    this.dialogRef.close();
  }

  sendInvite():any {

    if(this.email == "" || this.role == ""){
      return false;
    }
    
    let params:any = {}
    params.email = this.email;
    params.site_role = this.role;
    this.userService.sendInviteToRepresentator(this.userId, params).subscribe((response)=>{
      if (response && response.status) {
        this.dialogRef.close({
          action: 'added'
        });
      } else {
        console.error('Invalid API response structure:', response);
      }
    });
  }

  updateRepresentator():any{
    if(this.firstName == "" || this.lastName == "" || this.designation == ""){
      return false
    }

    let formdata = new FormData();

    formdata.append("user[first_name]", this.firstName);
    formdata.append("user[last_name]", this.lastName);
    formdata.append("user[designation]", this.designation);

    this.userService.updateRepresentator(this.idToUpdate, formdata).subscribe((response)=>{
      if (response && response.status) {
        this.dialogRef.close({
          action: 'updated'
        });
      } else {
        console.error('Invalid API response structure:', response);
      }
    });
  }

  sendAdminInvite():any {

    if(this.email == "" || this.role == ""){
      return false;
    }
    
    let params:any = {}
    params.email = this.email;
    params.site_role = this.role;
    this.userService.sendInviteToAdminRepresentator(params).subscribe((response)=>{
      if (response && response.status) {
        this.dialogRef.close({
          action: 'added'
        });
      } else {
        console.error('Invalid API response structure:', response);
      }
    });
  }
}

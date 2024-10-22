import { Component, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, computed, inject, model, signal } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UserService } from '../../../../services/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-sight-popup',
  templateUrl: './create-sight-popup.component.html',
  styleUrls: ['./create-sight-popup.component.scss']
})
export class CreateSightPopupComponent implements AfterViewInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly announcer = inject(LiveAnnouncer);
  filteredUsers:any = [];
  users:any = [];
  allUsers:any = [];
  hideInviteeOverlay: boolean = true;
  @ViewChild("userInput") userInput!: ElementRef;
  defaultDate: Date = new Date();

  eventName:any = "";
  managerName:any = "";
  date:any = "";
  address:any = "";
  zipcode:any = "";
  city:any = "";
  about:any = "";
  bannerFile:any = "";
  clubId:any = '';
  attachmentRows:any = [{
    title: "",
    file: ""
  }];
  @ViewChild('fileInput', { static: false }) fileInputElement!: ElementRef;
  constructor(public dialogRef : MatDialogRef<CreateSightPopupComponent>, public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.clubId = data.clubId
  }
  ngAfterViewInit() {
  }

  // triggerFileInput(): void {
  //   this.fileInputElement.nativeElement.click();  
  // }

  ngOnInit(): void {
    try {
       this.userService.getAllPlayers().subscribe((response)=>{
        if (response && response.status && response.data && response.data.userData) {
          this.allUsers = response.data.userData; 
          console.log(this.allUsers)
        } else {
          console.error('Invalid API response structure:', response); 
        }
      });     
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  

  close(){
    this.dialogRef.close();
  }

  toggleInviteeOverlay(){
    if(this.hideInviteeOverlay){
      this.hideInviteeOverlay = false;
    }else{
      this.hideInviteeOverlay = true;
    }
  }

  onBannerFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.bannerFile = input.files[0];
    }
  }
  onAttachmentFileChange(event: Event, index:any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.attachmentRows[index].file = input.files[0];
    }
  }

  titleUpdate(event: any, index:any){
    let value = event.target.value;
    this.attachmentRows[index].title = value;
  }



  addNewRow(){
    this.attachmentRows.push({
      title: "",
      file: ""
    });
  }

  removeRow(index:any):any {

    if(this.attachmentRows.length == 1){
      return false;
    }
    let temp = this.attachmentRows;
    temp.splice(index,1);
    this.attachmentRows = temp;
  }

  callListApi(userInput: HTMLInputElement) {
    setTimeout(() => {
      this.filteredUsers = this.allUsers.filter((user:any) => (user.first_name !== null && user.first_name !== undefined)  && 
      user.first_name.toLowerCase().indexOf(userInput.value.toLowerCase()) != -1
      );
    }, 2000);
    console.log(userInput.value);
  }

  onKeyPress(event: any){
    let keyword = event.target.value;
    console.log(keyword); // You can use this to see the current input value

    this.filteredUsers = this.allUsers.filter((user:any) => (user.first_name !== null && user.first_name !== undefined)  && 
      user.first_name.toLowerCase().indexOf(keyword.toLowerCase()) != -1);
  }

  remove(user: any): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    if (!this.users?.length){
      this.users.push(event.option.value);
      this.userInput.nativeElement.value = "";
    }else if (this.users?.length && !this.users.find((user:any) => user.id === event.option.value.id)) {
      this.users.push(event.option.value);
      this.userInput.nativeElement.value = "";
    } else {
      this.userInput.nativeElement.value = "";
    }
  }

  sendInvite(){
    this.hideInviteeOverlay = true;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    let date = this.formatDate(selectedDate);
    this.date = date;
  }

  formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  createSight(){

    let invitees:any = [];

    
    
    console.log(invitees)
    // let attachments:any = [];
    // this.attachmentRows.map(function(attachment:any) {
    //   let row:any = []
    //   row['title'] = attachment.title;
    //   row['file'] = attachment.file;
    //   attachments.push(row);
    // });

    // console.log(attachments);
    /*let params:any = {};

    params.event_name = this.eventName;
    params.manager_name = this.managerName;
    params.event_date = this.dateTime;
    params.event_time = this.dateTime;
    params.address = this.address;
    params.zipcode = this.zipcode;
    params.city = this.city;
    params.about_event = this.about;
    params.banner = this.bannerFile;
    params.attachment = this.attachmentRows;
    params.invites = invitees;*/

    const formData = new FormData();
    formData.append('event_name', this.eventName);
    formData.append('manager_name', this.managerName);
    formData.append('event_date', this.date);
    formData.append('event_time', "10:20 AM");
    formData.append('address', this.address);
    formData.append('zipcode', this.zipcode);
    formData.append('city', this.city);
    formData.append('about_event', this.about);
    formData.append('banner', this.bannerFile);
    // formData.append('invites', invitees);

    this.attachmentRows.map(function(attachment:any, index:any) {
      formData.append('attachments['+index+'][title]', attachment.title);
      formData.append('attachments['+index+'][file]', attachment.file);
    });

    this.users.map(function(user:any) {
      formData.append('invites[]', user.id);
    });
    
    try {
      this.userService.addSight(this.clubId, formData).subscribe((response)=>{
        console.log(response)
       if (response && response.status) {
         this.dialogRef.close({
          action: 'added'
         })
       } else {
         console.error('Invalid API response structure:', response); 
       }
     });     
   } catch (error) {
     console.error('Error:', error);
   }

  }
}

import { Component, Inject, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AdvertisementService } from '../../../../services/advertisement.service';
@Component({
  selector: 'app-AdvertisingPopupComponent',
  templateUrl: './advertising-popup.component.html',
  styleUrl: './advertising-popup.component.scss'
})
export class AdvertisingPopupComponent   {

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE)); 
  
  typeOptions: any = [
              '250 x 250 - Square',
              '200 x 200 - Small Square',
              '468 x 60 - Banner',
              '728 x 90 - Leaderboard',
              '300 x 250 - Inline Rectangle',
              '336 x 280 - Large Rectangle',
              '120 x 600 - Skyscraper',
              '160 x 600 - Wide Skyscraper'
          ];
  
  pageOptions: any = [
    {id:1, page:'Home'},
    {id:1, page:'Talents'},
    {id:1, page:'Clubs & Scouts'},
    {id:1, page:'About'},
    {id:1, page:'Blog'},
    {id:1, page:'Contact'},
    {id:1, page:'Login'},
    {id:1, page:'Sign Up'}
  ];
  idToEdit:any = '';
  name: any = "";
  redirect:any = "";
  type: any = "";
  page: any = "";
  startDate: any = new Date();
  endDate: any = new Date();
  noEndDate: any = false;
  disableEndDate:boolean = false;
  maxViews:any = "";
  maxClicks:any = "";  
  imageToUpload:any = "";
  error:boolean = false
  errorMsg:any = {}

  typeForView:any = "";
  pageName:any = "";
  imageUrl:any = ""
  constructor(
    public dialogRef: MatDialogRef<AdvertisingPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private advertisementService: AdvertisementService
  ) {}

  ngOnInit(): void {

    this._locale.set('fr');
    this._adapter.setLocale(this._locale()); 
    
    if(this.data.action == "update" || this.data.action == "view"){
      let existingRecord = this.data.ad;
      console.log(existingRecord)
      this.idToEdit = existingRecord.id;
      this.name = existingRecord.title;
      this.redirect = existingRecord.redirect_url;
      this.type = existingRecord.type;
      this.page = existingRecord.page_id;
      this.startDate = existingRecord.valid_from;
      this.endDate = existingRecord.valid_to;
      this.noEndDate = existingRecord.no_validity;
      if(this.noEndDate == '0'){
        this.disableEndDate = false;
        this.noEndDate = false;
      }else{
        this.disableEndDate = true;
        this.noEndDate = true;
      }
      this.maxViews = existingRecord.views;
      this.maxClicks = existingRecord.clicks;


      /* for view only*/

      this.typeForView = this.type.split('-')[0];
      let index = this.pageOptions.findIndex((x:any) => x.id == this.page);
      this.pageName = this.pageOptions[index].page;
      this.imageUrl = "https://api.socceryou.ch/uploads/"+existingRecord.featured_image
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  onDateChange(dateType:any, event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    let date = this.formatDate(selectedDate);
    if(dateType == 'start'){
      this.startDate = date;
    }else if(dateType == 'end'){
      this.endDate = date;
    }
    console.log(date)
  }

  formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onNoEndDateChange(event: any): void{
    const checked = event.target.checked;
    console.log(checked)
    if(checked){
      this.disableEndDate = true;
    }else{
      this.disableEndDate = false;
    }
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      let FileToUpload = input.files[0];
      this.imageToUpload = FileToUpload;
      // let $this = this;
      // let reader = new FileReader();
      // reader.onload = function (fileData:any) {
      //   $this.image = fileData.target.result;
      // };
      // reader.readAsDataURL(FileToUpload);

      // let formdata = new FormData();
      // formdata.append("profile_image", this.imageToUpload);
      // this.imageLoading = true;
      // this.userService.updateAdminImage(formdata).subscribe((response)=>{
      //   if (response && response.status) {        
      //     // this.isLoading = false;
      //     this.imageLoading = false;
      //     this.showMatDialog("Profile image updated successfully!", 'display')
      //   } else {
      //     // this.isLoading = false;
      //     this.imageLoading = false;
      //     console.error('Invalid API response structure:', response);
      //     this.showMatDialog("Error in uploading image", 'display')
      //   }
      // }); 
    }
  }


  validateAdvertisementForm(){

    this.error = false;
    this.errorMsg = {};
    
    if(this.name == ""){
      this.error = true;
      this.errorMsg.name = "Name is required";
    }
    if(this.redirect == ""){
      this.error = true;
      this.errorMsg.redirect = "Redirect url is required";
    }
    
    if(this.type == ""){
      this.error = true;
      this.errorMsg.type = "Type is required";
    }
    
    if(this.page == ""){
      this.error = true;
      this.errorMsg.page = "Page is required";
    }
    
    if(this.maxViews == ""){
      this.error = true;
      this.errorMsg.maxViews = "Max views is required";
    }
    
    if(this.maxClicks == ""){      
      this.error = true;
      this.errorMsg.maxClicks = "Max clicks is required";
    }
    return this.error;

  }

  createAd():any {

    let validForm:any = this.validateAdvertisementForm();
    if(validForm){
      return false;
    }
    let formdata = new FormData();
    if(this.imageToUpload != ""){
      formdata.append("featured_image", this.imageToUpload);
    }
    formdata.append("title", this.name);
    formdata.append("redirect_url", this.redirect);
    formdata.append("type", this.type);
    formdata.append("page_id", this.page);
    formdata.append("valid_from", this.startDate);

    if(this.noEndDate){
      formdata.append("no_validity", '1');
    }else{
      formdata.append("valid_to", this.endDate);
    } 
    formdata.append("status", '2');
    formdata.append("views", this.maxViews);
    formdata.append("clicks", this.maxClicks);

    this.advertisementService.createAd(formdata).subscribe(
      response => {
        if(response.status){
          this.dialogRef.close({
            action: 'added'
          });
        }else{
          this.errorMsg = response.data.error
        }
      },
      error => {
        console.error('Error publishing coupon:', error);
      }
    );
  }

  updateAd():any {
    
    let validForm:any = this.validateAdvertisementForm();
    if(validForm){
      return false;
    }
    let formdata = new FormData();
    if(this.imageToUpload != ""){
      formdata.append("featured_image", this.imageToUpload);
    }
    formdata.append("title", this.name);
    formdata.append("redirect_url", this.redirect);
    formdata.append("type", this.type);
    formdata.append("page_id", this.page);
    formdata.append("valid_from", this.startDate);

    if(this.noEndDate){
      formdata.append("no_validity", '1');
    }else{
      formdata.append("valid_to", this.endDate);
    } 
    formdata.append("status", '2');
    formdata.append("views", this.maxViews);
    formdata.append("clicks", this.maxClicks);

    this.advertisementService.updateAd(this.idToEdit, formdata).subscribe(
      response => {
        if(response.status){
          this.dialogRef.close({
            action: 'updated'
          });
        }else{
          this.errorMsg = response.data.error
        }
      },
      error => {
        console.error('Error publishing ad:', error);
      }
    );
  }

}

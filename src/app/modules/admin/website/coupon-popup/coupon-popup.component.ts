import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CouponService } from '../../../../services/coupon.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-templates',
  templateUrl: './coupon-popup.component.html',
  styleUrl: './coupon-popup.component.scss'
})
export class CoupenPopupComponent   {
  startDate: any = new Date();
  endDate: any = new Date();
  type: any = "";
  name: any = "";
  code: any = "";
  discount: any = "";
  validBetween: any = "";
  noEndDate: boolean = false;
  isLimitedUse: boolean = false;
  limit: any = ""
  isSingleUsePerCustomer: boolean = false;
  disableEndDate:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CoupenPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private couponService: CouponService
  ) {}

  ngOnInit(): void {
    if(this.data.action == "update"){

      let existingRecord = this.data.couponData;
      if(existingRecord.discount_type == "amount_off"){
        this.type = 'amount';
      }else if(existingRecord.discount_type == "percent_off"){
        this.type = 'percent';
      }
      
      this.name = existingRecord.title; 
      this.code = existingRecord.coupon_code;
      this.discount = existingRecord.discount;
      // this.validBetween = 
      this.isLimitedUse = existingRecord.is_limit;
      this.limit = existingRecord.limit;
      this.isSingleUsePerCustomer = existingRecord.limit_per_user;

    }
  }

  close(): void {
    console.log('Close button clicked');
    this.dialogRef.close();
  } 

  createCoupon(){

    let params:any = {}
    params.title = this.name;
    params.coupon_code = this.code;
    if(this.type == "amount"){
      params.discount_type = 'amount_off';
    }else if(this.type == "percent"){
      params.discount_type = 'percent_off';
    }
    params.discount = this.discount;
    
    params.valid_from = this.startDate;

    if(this.noEndDate){
      params.no_validity = 1;
    }else{
      params.valid_to = this.endDate;
    }
    params.status = 'published';
    
    if(this.isLimitedUse){
      params.is_limit = 1;
      params.limit = this.limit;
    }

    if(this.isSingleUsePerCustomer){
      params.limit_per_user = 1;
    }

    console.log(params)
    
    this.couponService.addPopups(params).subscribe(
      response => {
        if(response.status){
          
        }else{
          
        }
      },
      error => {
        console.error('Error publishing coupon:', error);
      }
    );
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
  

}

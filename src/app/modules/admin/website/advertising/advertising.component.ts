import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessagePopupComponent } from '../../message-popup/message-popup.component';
import { AdvertisementService } from '../../../../services/advertisement.service';
@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrl: './advertising.component.scss'
})
export class AdvertisingComponent {

  advertisements:any = [];
  displayedColumns: string[] = ['#','Name', 'Type', 'Page','Display Duration','Status','View', 'Edit','Remove'];
  
  checkboxIds: string[] = [];
  allSelected: boolean = false;
  userId: any; 
  newStatus: any;
  isLoading:boolean = false;
  filterValue: string = '';
  filterDialogRef:any = ""
  idsToProceed: any = [];
  selectedIds:any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private advertisementService: AdvertisementService, public dialog: MatDialog) {}

  ngOnInit(): void {
    
     this.getAdvertisements();
  }

  getAdvertisements() {
    this.isLoading = true;
    let params:any = {};
    // params.offset = page;
    params.search = this.filterValue;
    // params.limit  = pageSize;  
    
    try {
     this.advertisementService.getAdvertisements(params).subscribe((response)=>{
      if (response && response.status && response.data && response.data.advertisements) {
        this.advertisements = response.data.advertisements; 
        // this.paginator.length = response.data.totalCount;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
      });     
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching advertisements:', error);
    }
  }


  applyFilter(filterValue:any) {
    this.filterValue = filterValue.target?.value.trim().toLowerCase();
    if(this.filterValue.length >= 3){
      this.getAdvertisements();
     } else if(this.filterValue.length == 0){
      this.getAdvertisements();
     }
  }

  onCheckboxChange(item: any) {
    const index = this.selectedIds.indexOf(item.id);
    if (index === -1) {
      this.selectedIds.push(item.id);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }

  selectAllCoupons() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selectedIds = this.advertisements.map((ad:any) => ad.id);
    } else {
      this.selectedIds = [];
    }
    console.log('Selected user IDs:', this.selectedIds);
  }

  editAdvertisement(element:any){
    // const dialogRef = this.dialog.open(AdvertisingPopupComponent,{
    //   height: '500px',
    //   width: '600px',
    //   panelClass: 'cutam-cupen'
    //   // position: {
    //   //   top:'75px',
    //   //   left:'340px'
    //   // }
    
    // });
  }


  createAdvertisement(){

  }

  viewCoupon(element:any){

  }

  bulkPublish(): any{
    if(this.selectedIds.length == 0){
      this.showMatDialog('Select advertisement(s) first.', 'display');
      return false;
    }

    let params = {id:this.selectedIds};
    this.advertisementService.publishAdvertisements(params).subscribe(
      response => {
        if(response.status){
          this.getAdvertisements();
          this.selectedIds = [];
          this.allSelected = false;
          // console.log('Coupons deleted successfully:', response);
          this.showMatDialog('Advertisement(s) published successfully!.', 'display');
        }else{
          this.showMatDialog('Error in publishing advertisement. Please try again.', 'display');
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );

  }

  bulkDraft(): any {
    if(this.selectedIds.length == 0){
      this.showMatDialog('Select advertisement(s) first.', 'display');
      return false;
    }

    let params = {id:this.selectedIds};
    this.advertisementService.draftAdvertisements(params).subscribe(
      response => {
        if(response.status){
          this.getAdvertisements();
          this.selectedIds = [];
          this.allSelected = false;
          // console.log('Coupons deleted successfully:', response);
          this.showMatDialog('Advertisement(s) drafted successfully!.', 'display');
        }else{
          this.showMatDialog('Error in drafting advertisement. Please try again.', 'display');
        }
      },
      error => {
        console.error('Error drafted advertisement:', error);
      }
    );
  }

  confirmDeletion():any {
    if(this.selectedIds.length == 0){
      this.showMatDialog('Select advertisement(s) first.', 'display');
      return false;
    }
    this.idsToProceed = this.selectedIds;
    this.showDeleteConfirmationPopup();
  }

  showDeleteConfirmationPopup(){
    this.showMatDialog("", "delete-advertisement-confirmation");
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

    messageDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(result.action == "delete-confirmed"){
          this.deleteAdvertisement();
        }
      //  console.log('Dialog result:', result);
      }
    });
  }

  deleteAdvertisement():any {

    let params = {id:this.idsToProceed};
    this.advertisementService.deleteAdvertisements(params).subscribe(
      response => {
        if(response.status){
          this.getAdvertisements();
          this.selectedIds = [];
          this.allSelected = false;
          // console.log('Coupons deleted successfully:', response);
          this.showMatDialog('Advertisement(s) deleted successfully!.', 'display');
        }else{
          this.showMatDialog('Error in removing advertisement. Please try again.', 'display');
        }
      },
      error => {
        console.error('Error deleting advertisement:', error); 
      }
    );
  }

  confirmSingleDeletion(couponId:any){
    this.idsToProceed = [couponId];
    this.showMatDialog("", "delete-advertisement-confirmation");
  }
}


import { Component, inject, Inject } from '@angular/core';
import {
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';


@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss'
})
export class FilterPopupComponrnt
 {

  readonly dialogRef = inject(MatDialogRef<FilterPopupComponrnt>);
  userFilters: any = [];
  condition:any = 1;
  locations: any = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('filters', data);
    this.userFilters = data.filters;
    this.locations = data.locations;

    console.log(this.locations)
  }
  
  close(){
    this.dialogRef.close(this.userFilters);
  }

  setFilter(type:any, value:any){
    this.userFilters[type] = value;
  }

  applyUserFilter(){
    this.close();
  }
  
  resetUserFilter(){
    this.userFilters = [];
    this.close();
  }
}

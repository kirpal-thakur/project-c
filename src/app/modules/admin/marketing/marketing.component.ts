import { Component, inject,ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { MarketingPopupComponent } from './marketing-popup/marketing-popup.component';
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';
import { MarketingService } from '../../../services/marketing.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent {
  displayedColumns: string[] = ['#','Name', 'For', 'Language','Display Freq','Display Location','Start Date','End Date','Status','Edit','Remove'];
  isLoading= false;
  popups: any = [];
  allSelected: boolean = false;
  selectedPopIds: number[] = [];
  checkboxIds: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private marketingApi: MarketingService) {}
  ngOnInit(): void {
    this.fetchPopups();
  }

  async fetchPopups(): Promise<void> {
    try {
      this.isLoading = true;
     this.marketingApi.getPopups().subscribe((response)=>{
      if (response && response.status && response.data && response.data.popups) {
        this.popups = response.data.popups;
        this.paginator.length = response.data.totalCount;
        this.isLoading = false;
        
      } else {
        this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
      });     
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching users:', error);
    }
  }
  onCheckboxChange(template: any) {
    const index = this.checkboxIds.indexOf(template.id);
    if (index === -1) {
      this.checkboxIds.push(template.id);
    } else {
      this.checkboxIds.splice(index, 1);
    }
  }

  showRole(id:number){
    return environment.roles.filter(role =>
      role.id == id
    ).map(role =>
      role.role
    );
  }
  editPopup(id:number){

  }
  removePopup(id:number){
    
  }
  deleteSelected(){
    const templateIds = {
      id: this.checkboxIds,
    };
   /*  this.marketingApi.deleteEmailTemplate(templateIds).subscribe(result => {
      if (result && result.status) {
          this.fetchTemplates();
      } else {
        this.isLoading = false;
        console.error('Invalid API response structure:', result);
      }
     }); */
  }
  selectAllTemplates() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.checkboxIds = this.popups.map((popup:any) => popup.id);
    } else {
      this.checkboxIds = [];
    }
    console.log('Selected user IDs:', this.checkboxIds);
  }
  editMarkiting(){
    console.log('Edit user button clicked!');
    const dialogRef = this.dialog.open(MarketingPopupComponent,
     {
      height: '550px',
      width: '550px',
  });

  }

  editfilter(){
    this.dialog.open(FilterPopupComponrnt,{
      height: '450px',
      width: '300px',
      position: {
        right: '30px',
        top:'150px'
      }
    })
  }

  getAllCheckboxIds(): string[] {
    return this.checkboxIds;
  }
}

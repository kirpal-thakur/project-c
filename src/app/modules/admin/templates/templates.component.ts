import { Component, inject,ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { TemplatePopupComponent } from './template-popup/template-popup.component'; 
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';
import { TemplateService } from '../../../services/template.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  displayedColumns: string[] = ['#','Name', 'For', 'Language','Created Date - Time','Edit','Remove'];
  isLoading= false;
  templates: any = [];
  allSelected: boolean = false;
  selectedTemplatesIds: number[] = [];
  
  constructor(public dialog: MatDialog,private tempalateApi: TemplateService,) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchTemplates();
  }
  
  showRole(id:number){
    return environment.roles.filter(role =>
      role.id == id
    ).map(role =>
      role.role
    );
  }
  onCheckboxChange(template: any) {
    const index = this.selectedTemplatesIds.indexOf(template.id);
    if (index === -1) {
      this.selectedTemplatesIds.push(template.id);
    } else {
      this.selectedTemplatesIds.splice(index, 1);
    }
  }
  deleteSelected(){
    const templateIds = {
      id: this.selectedTemplatesIds,
    };
    this.tempalateApi.deleteEmailTemplate(templateIds).subscribe(result => {
      if (result && result.status) {
          this.fetchTemplates();
      } else {
        this.isLoading = false;
        console.error('Invalid API response structure:', result);
      }
     });
  }
  selectAllTemplates() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selectedTemplatesIds = this.templates.map((template:any) => template.id);
    } else {
      this.selectedTemplatesIds = [];
    }
    console.log('Selected user IDs:', this.selectedTemplatesIds);
  }
  async fetchTemplates(): Promise<void> {
    try {
      this.isLoading = true;
     this.tempalateApi.getTemplates().subscribe((response)=>{
      if (response && response.status && response.data && response.data.emailTemplates) {
        //this.templates = [];
        // this.templates = response.data.emailTemplates;
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
  addTemplate(){
    const dialogRef = this.dialog.open(TemplatePopupComponent,{
      height: '550px',
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result?.action !='remove'){
          delete result.data.id;
          this.tempalateApi.addEmailTemplate(result.data).subscribe(result => {
            if (result && result.status) {
                this.fetchTemplates();
            } else {
              this.isLoading = false;
              console.error('Invalid API response structure:', result);
            }
           });
      }

    });
  }

  removeTemplate(tempalateId: any){
    const templateIds = {
      id: [tempalateId],
    };
      this.tempalateApi.deleteEmailTemplate(templateIds).subscribe(result => {
        if (result && result.status) {
            this.fetchTemplates();
        } else {
          this.isLoading = false;
          console.error('Invalid API response structure:', result);
        }
       });
  }
  onPageChange(){

  }
  editTemplate(tempalateData: any){
    const dialogRef = this.dialog.open(TemplatePopupComponent,{
      height: '550px',
      width: '550px',
      data: tempalateData
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result?.action !='remove'){
        console.log('result',result)
        if(result.id != 0){
          this.tempalateApi.updateEmailTemplate(result.data.id, result.data).subscribe(result => {
            if (result && result.status) {
                this.fetchTemplates();
            } else {
              this.isLoading = false;
              console.error('Invalid API response structure:', result);
            }
           });
        }else{
          this.tempalateApi.addEmailTemplate(result.data).subscribe(result => {
            if (result && result.status) {
                this.fetchTemplates();
            } else {
              this.isLoading = false;
              console.error('Invalid API response structure:', result);
            }
           });
        }
      }

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
}

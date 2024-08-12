import { Component, inject } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { MarketingPopupComponent } from './template-popup/template-popup.component'; 
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';
import { TemplateService } from '../../../services/template.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  displayedColumns: string[] = ['#','Name', 'For', 'Language','Created Date - Time','Edit','Remove'];
  isLoading= false;
  templates: any = [];
  constructor(public dialog: MatDialog,private tempalateApi: TemplateService,) {}

  ngOnInit(): void {
     this.fetchTemplates();
  }
  

  async fetchTemplates(): Promise<void> {
    try {
      this.isLoading = true;
     this.tempalateApi.getTemplates().subscribe((response)=>{
      if (response && response.status && response.data && response.data.emailTemplates) {
        this.templates = response.data.emailTemplates; 
        this.isLoading = false;
       // this.paginator.length = data.totalCount;
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
    const dialogRef = this.dialog.open(MarketingPopupComponent,{
      height: '528px',
      width: '500px',
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
  editTemplate(tempalateData: any){
    const dialogRef = this.dialog.open(MarketingPopupComponent,{
      height: '528px',
      width: '500px',
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

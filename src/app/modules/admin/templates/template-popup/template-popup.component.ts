import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { environment } from '../../../../../environments/environment';
import { TemplateService } from '../../../../services/template.service';
@Component({
  selector: 'app-templates',
  templateUrl: './template-popup.component.html',
  styleUrl: './template-popup.component.scss'
})
export class TemplatePopupComponent  implements OnInit, OnDestroy  {
  // id = 0;
  editor!: Editor;
  title:string = "";
  selectedRole:any = 0;
  selectedLang:any = 1;
  selectedLocation:any = 1;
  roles:any = [];
  langs:any = [];
  locations:any = [];
  templateIdToEdit: any = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  content: string = '';
  error:boolean = false
  errorMsg:any = {}

  constructor(
    
    public dialogRef: MatDialogRef<TemplatePopupComponent>, private tempalateApi: TemplateService,
    @Inject(MAT_DIALOG_DATA) public template: any
  ) {
    if(template){
      this.templateIdToEdit = template.id;
      this.title = template.title;
      this.content = template.content;
      this.selectedRole = Number(template.email_for);
      this.selectedLang = 4; //template.language;
      this.selectedLocation = 3; //template.location;
    }

    let envRoles:any = environment.roles;
    envRoles[0].id = 0;
    envRoles[0].role = 'All';
    this.roles = envRoles;
    this.langs = environment.langs;
    this.locations = environment.domains;
  }

  ngOnInit(): void {
    this.editor = new Editor();

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  close(): void {
   console.log(this.editor);
    this.dialogRef.close({
    });
  }
  
  remove(): void {
    this.dialogRef.close({
      action:'remove'
    });
  }

  validateForm(){

    this.error = false;
    this.errorMsg = {};
    
    if(this.title == ""){
      this.error = true;
      this.errorMsg.title = "Title is required";
    }
    if(this.content == "" || this.content == "<p></p>"){
      this.error = true;
      this.errorMsg.content = "Content is required";
    }
    return this.error;
  }

  createTemplate():any{

    let validForm:any = this.validateForm();
    if(validForm){
      return false;
    }
   
    let params:any = {}
    params.title = this.title;
    params.content = this.content;
    params.email_for = this.selectedRole;
    params.language = this.selectedLang;
    params.location = this.selectedLocation;
    params.status  = 1; // 1 for active, 2 for inactive
    
    this.tempalateApi.addEmailTemplate(params).subscribe((response)=>{
      if (response && response.status) {
        this.dialogRef.close({
          action: 'templateAdded'
        });
      } else {
        // this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
    });         
  }

  updateTemplate():any{

    let validForm:any = this.validateForm();
    if(validForm){
      return false;
    }

    let params:any = {}

    params.title = this.title;
    params.content = this.content;
    params.email_for = this.selectedRole;
    params.language = this.selectedLang;
    params.location = this.selectedLocation;
    params.status  = 1; // 1 for active, 2 for inactive
    
    this.tempalateApi.updateEmailTemplate(this.templateIdToEdit, params).subscribe((response)=>{
      if (response && response.status) {
        this.dialogRef.close({
          action: 'templateUpdated'
        });
      } else {
        // this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
    });         
  }

}

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-templates',
  templateUrl: './template-popup.component.html',
  styleUrl: './template-popup.component.scss'
})
export class MarketingPopupComponent  implements OnInit, OnDestroy  {
  id = 0;
  editor!: Editor;
  title:string = "";
  selectedRole:number = 2;
  selectedLang:number = 1;
  selectedLocation:number = 1;
  roles:any = [];
  langs:any = [];
  locations:any = [];

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  content: string = '';
  constructor(
    
    public dialogRef: MatDialogRef<MarketingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public template: any
  ) {
    if(template){

      this.id = template.id;
      this.title = template.title;
      this.content = template.content;
      this.selectedRole = template.email_for;
      this.selectedLang = template.language;
      this.selectedLocation = template.location;
    }

    this.roles = environment.roles;
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
      data : {
        id: this.id,
        title: this.title,
        content: this.content,
        email_for: this.selectedRole,
        language:this.selectedLang,
        location:this.selectedLocation,
        status:2
      }
    });
  }
  save(): void {
    this.dialogRef.close({
      data : {
        id: this.id,
        title: this.title,
        content: this.content,
        email_for: this.selectedRole,
        language:this.selectedLang,
        location:this.selectedLocation,
        status:1
      }
    });
  }
  remove(): void {
    this.dialogRef.close({
      action:'remove'
    });
  }

}

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-templates',
  templateUrl: './template-popup.component.html',
  styleUrl: './template-popup.component.scss'
})
export class MarketingPopupComponent  implements OnInit, OnDestroy  {

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html: string = '';


  constructor(
    public dialogRef: MatDialogRef<MarketingPopupComponent>
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  close(): void {
    this.dialogRef.close();
  }

}

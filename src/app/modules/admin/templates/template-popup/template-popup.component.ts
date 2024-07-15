import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-templates',
  templateUrl: './template-popup.component.html',
  styleUrl: './template-popup.component.scss'
})
export class MarketingPopupComponent  implements OnInit, OnDestroy  {
  editor!: Editor; // Using "!" to assert that editor will be initialized

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
    console.log('Close button clicked');
    this.dialogRef.close();
  }

}

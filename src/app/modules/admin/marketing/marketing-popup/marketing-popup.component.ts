import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-marketing-popup',
  templateUrl: './marketing-popup.component.html',
  styleUrls: ['./marketing-popup.component.scss']
})
export class MarketingPopupComponent {
  editor!: Editor;
  html = '';
  selectedRole:number = 2;
  selectedLang:number = 1;
  selectedLocation:number = 1;
  roles:any = [];
  langs:any = [];
  locations:any = [];
  constructor(
    public dialogRef: MatDialogRef<MarketingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.roles = environment.roles;
    this.langs = environment.langs;
    this.locations = environment.domains;
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  close() {
    console.log('Close button clicked');
    this.dialogRef.close();
  }

  onClickOutside() {
    console.log('Clicked outside the dialog');
   // this.dialogRef.close();
  }
}

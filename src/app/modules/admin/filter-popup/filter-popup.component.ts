import { Component,inject } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss'
})
export class FilterPopupComponrnt
 {
  readonly dialogRef = inject(MatDialogRef<FilterPopupComponrnt>);

  close(){
    this.dialogRef.close();
  }
}

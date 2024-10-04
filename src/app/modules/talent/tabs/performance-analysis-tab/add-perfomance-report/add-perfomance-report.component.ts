import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TalentService } from '../../../../../services/talent.service';

@Component({
  selector: 'app-add-perfomance-report',
  templateUrl: './add-perfomance-report.component.html',
  styleUrl: './add-perfomance-report.component.scss'
})
export class AddPerfomanceReportComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPerfomanceReportComponent>,
    public dialog: MatDialog,
    private talentService: TalentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}

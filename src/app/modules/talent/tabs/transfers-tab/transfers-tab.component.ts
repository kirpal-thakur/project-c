import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TalentService } from '../../../../services/talent.service';
import { EditTransferDetailsComponent } from '../../edit-transfer-details/edit-transfer-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'talent-transfers-tab',
  templateUrl: './transfers-tab.component.html',
  styleUrl: './transfers-tab.component.scss',
})
export class TransfersTabComponent {
  defaultDate: Date = new Date(2023, 4, 21); // May 21, 2023
  userId: any = '';
  userTransfers: any = [];
  editableId: string = "";
  teams:any = [];
  dataTOBeUpdated:any = {
    team_from: "",
    team_to: "",
    session: "",
    date_of_transfer: ""
  }
  seasons:any = [];
  constructor(private route: ActivatedRoute, private userService: TalentService, private router: Router ,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.userId = params.id;
      this.getUserTransfers();
    });
    this.getSeasonsOptions();
    this.getAllTeams();
  }

  getSeasonsOptions() {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();

    // Populate the years array from startYear to currentYear
    for (let year = startYear; year <= currentYear; year++) {
      this.seasons.push(year);
    }
  }

  getUserTransfers(){
    try {
      this.userService.getTransferData().subscribe((response)=>{
        if (response && response.status && response.data) {
          this.userTransfers = response.data.transferDetail;
          // this.isLoading = false;
        } else {
          // this.isLoading = false;
          console.error('Invalid API response structure:', response);
        }
      });
    } catch (error) {
      // this.isLoading = false;
      console.error('Error fetching users:', error); 
    }
  }

  getAllTeams(){
    this.userService.getTeams().subscribe((response)=>{
      if (response && response.status && response.data && response.data.teams) {
        this.teams = response.data.teams;
        console.log(this.teams)
      }
    });
  }

  editPerformance(performanceId:any){
    this.editableId = performanceId;
    let index = this.userTransfers.findIndex((x:any) => x.id == performanceId);
    let currentRow = this.userTransfers[index];
    this.defaultDate = currentRow.date_of_transfer;
    this.dataTOBeUpdated = {
      team_from: currentRow.team_from,
      team_to: currentRow.team_to,
      session: currentRow.session,
      date_of_transfer: currentRow.date_of_transfer
    }

    console.log(this.dataTOBeUpdated);
  }

  openEditDialog(transfer: any) {
    console.log('Opening edit dialog for transfer:', transfer);
  
    const dialogRef = this.dialog.open(EditTransferDetailsComponent, {
      width: '800px',
      data: {
        team_from: transfer.team_from,
        team_to: transfer.team_to,
        session: transfer.session,
        date_of_transfer: transfer.date_of_transfer
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transfer updated:', result);
        this.updateTransfer(transfer.id, result);
      } else {
        console.log('User canceled the edit');
      }
    });
  }
  
  updateTransfer(transferId: number, updatedData: any) {
    this.userService.updateTransferDetails(transferId, updatedData).subscribe(
      response => {
        console.log('Transfer updated successfully:', response);
        // Refresh the transfers list or take other actions
        this.getUserTransfers();
      },
      error => {
        console.error('Error updating transfer:', error);
      }
    );
  }
  
  
  onSelectChange(event: Event, key:string): void {
    const selectElement = event.target as HTMLSelectElement;
    this.updateRow(key,Number(selectElement.value));
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    let date = this.formatDate(selectedDate);
    this.updateRow('date_of_transfer',date);
  }

  onInputChange(event: Event, key:string): void {
    let inputElement = event.target as HTMLInputElement;
    this.updateRow(key,inputElement.value);
  }

  updateRow(key:any, value:any){
    this.dataTOBeUpdated[key] = value;

    console.log(this.dataTOBeUpdated);
  }

  formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

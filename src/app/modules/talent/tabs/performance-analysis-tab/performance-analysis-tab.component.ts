import { Component, OnInit } from '@angular/core'; 
import { TalentService } from '../../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPerfomanceReportComponent } from './add-perfomance-report/add-perfomance-report.component';
import { MessagePopupComponent } from '../../message-popup/message-popup.component';

interface Report {
  id: string;
  document_title: string;
  created_at: string;
  selected?: boolean;  // This will store the selected state of the checkbox
}

@Component({
  selector: 'talent-performance-analysis',
  templateUrl: './performance-analysis-tab.component.html',
  styleUrls: ['./performance-analysis-tab.component.scss']
})
export class PerformanceAnalysisTabComponent implements OnInit {
  reports: Report[] = [];
  errorMessage: string | null = null;
  allSelected: boolean = false;
  selectedIds: number[] = [];
  idsToDelete: any = [];

  constructor(private talentService: TalentService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.talentService.getPerformanceReports().subscribe(
      response => {
        if (response.status) {
          this.reports = response.data.reports.map((report: Report) => ({
            ...report,
            selected: false // Initialize selected state as false
          }));
        } else {
          this.errorMessage = response.message;
        }
      },
      error => {
        this.errorMessage = 'Error fetching reports: ' + error.message;
      }
    );
  }

  toggleSelectAll() {
    this.allSelected = !this.allSelected;
    this.reports.forEach(report => (report.selected = this.allSelected));
  }

  // Download selected reports (You might need to adjust based on your API implementation)
  downloadSelectedReports() {
    const selectedReports = this.reports.filter(report => report.selected);
    if (selectedReports.length > 0) {
      // Assuming you have an endpoint to download reports by IDs
      const selectedIds = selectedReports.map(report => report.id);
      this.talentService.downloadReports(selectedIds).subscribe(
        (response) => {
          // Handle download logic here (e.g., downloading files)
          console.log('Reports downloaded successfully');
        },
        (error) => {
          console.error('Error downloading reports:', error);
        }
      );
    } else {
      console.log('No reports selected for download.');
    }
  }

  openAddReport() {
    const dialogRef = this.dialog.open(AddPerfomanceReportComponent, {
      width: '870px',    
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReports(); // Reload reports after a new one is added
      }
    });
  }
  
  onCheckboxChange(report: any) {
    const index = this.selectedIds.indexOf(report.id);
    if (index === -1) {
      this.selectedIds.push(Number(report.id));
    } else {
      this.selectedIds.splice(index, 1);
    }
  
    console.log('Selected report IDs:', report);
    console.log('Selected report IDs:', this.selectedIds);
  }

  selectAllReports() {
    this.allSelected = !this.allSelected;
  
    // Toggle selection for all reports
    this.reports.forEach(report => {
      report.selected = this.allSelected;
      if (this.allSelected) {
        if (!this.selectedIds.includes(Number(report.id))) {
          this.selectedIds.push(Number(report.id));
        }
      } else {
        this.selectedIds = [];
      }
    });
  
    console.log('Selected report IDs:', this.selectedIds);
  }
  
  
  deleteReports() {
    let params :any = {id:this.selectedIds};
    if (confirm('Are you sure you want to delete the selected reports?')) {
      
      this.talentService.deletePerformance(params).subscribe(
        (response) => {
          if (response.status) {
            this.loadReports();
            this.selectedIds = [];
            this.allSelected = false;
            console.log('Reports deleted successfully.');
          } else {
            console.log('Reports not deleted.');
          }
        },
        (error) => {
          console.error('Error deleting reports:', error);
        }
      );

    }
  }
  
}

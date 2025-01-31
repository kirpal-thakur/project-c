import { Component, Input, OnInit } from '@angular/core'; 
import { TalentService } from '../../../../services/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPerfomanceReportComponent } from './add-perfomance-report/add-perfomance-report.component';

interface Report {
  id: string;
  document_title: string;
  created_at: string;
  file_name: string;
  file_type: string;
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
  path: any ;
  @Input() isPremium: any;

  constructor(private talentService: TalentService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.talentService.getPerformanceReports().subscribe(
      response => {
        if (response.status) {
          this.path = response.data.uploads_path;
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

  // Download a single report
  async downloadInvoice(id: any, src: any ,type : any) {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob(); // Convert the response to a Blob object
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `report-${id}.${type}`; // Set the filename for download
      document.body.appendChild(anchor);
      anchor.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    } catch (error) {
      console.error('There was an error downloading the file:', error);
    }
  }

  // Download selected reports
  // async downloadSelectedReports() {
  //   const selectedReports = this.reports.filter(report => report.selected);
  //   let selectedIds :any = [];

  //   console.log(selectedReports)
  //   if (selectedReports.length > 0) {
  //     // Loop through each selected report and download it
  //     for (const report of selectedReports) {
  //       selectedIds[] = report.id
  //       await this.downloadInvoice(selectedIds);
  //       // await this.downloadInvoice(report.id, this.path+report.file_name ,report.file_type);
  //     }
  //   } else {
  //     console.log('No reports selected for download.');
  //   }
  // }

  // Download selected reports
  downloadSelectedReports() {
    const selectedReports = this.reports.filter(report => report.selected);
    let selectedIds: any[] = []; // Initialize as an array

    if (selectedReports.length > 0) {
      // Collect all selected report IDs
      for (const report of selectedReports) {
        selectedIds.push(report.id);
      }

      this.talentService.downloadReports(selectedIds).subscribe(
        response => {
          if (response.status) {
            console.log(selectedIds);
            // Open the file in a new tab
            window.open(response.data.zip_path);
          }
        },
        error => {
          this.errorMessage = 'Error fetching reports: ' + error.message;
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
    if(this.selectedIds.length <= 0){
      return
    }
    let params :any = {id:this.selectedIds};
    if (confirm('Are you sure you want to delete the selected reports?')) {
      
      this.talentService.deletePerformanceReport(params).subscribe(
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

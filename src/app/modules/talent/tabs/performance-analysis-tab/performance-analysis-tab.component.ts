import { Component, OnInit } from '@angular/core';
import { TalentService } from '../../../../services/talent.service';

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

  constructor(private talentService: TalentService) {}

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

  onCheckboxChange() {
    this.allSelected = this.reports.every(report => report.selected);
  }
}

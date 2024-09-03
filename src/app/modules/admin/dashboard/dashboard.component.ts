
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Chart, registerables, ChartDataset } from 'chart.js';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../../../services/dashboard.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3') canvas3!: ElementRef<HTMLCanvasElement>;
 // @ViewChild('canvas4') canvas4!: ElementRef<HTMLCanvasElement>;

  lang: string = '';
  chart1!: Chart;
  chart2!: Chart;
  chart3!: Chart;
  chart4!: Chart;
  newRegistrations:any = [];
  chartData:any = [];
  activeLanguage: string = '';
  themeText: string = 'Light Mode'
  newRegistrationClubs:any = [];
  newRegistrationPlayers:any = [];
  newRegistrationScouts:any = [];
  years:any = [];
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private dashboardApi:DashboardService,
    private router: Router,
    private translateService: TranslateService,
    private viewportScroller: ViewportScroller
  ) {
    this.getChardData();
  }

  ngOnInit() {
    this.updateThemeText();
    this.getNewRegistrations();
    this.getNewRegistrationsWithScout();
    this.getNewRegistrationsWithClub();
    this.getNewRegistrationsWithPlayers();
    this.generateYears();
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    
  }
  getNewRegistrations(){
    try {
      this.dashboardApi.getNewRegistration(5).subscribe((response)=>{
        if (response && response.status && response.data) { 
          this.newRegistrations = response.data.userData;
        } else {
          console.error('Invalid API response structure:', response);
        }
        });     
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  }
  getNewRegistrationsWithPlayers(){
    try {
      this.dashboardApi.getNewRegistrationWithRole(4,10).subscribe((response)=>{
        if (response && response.status && response.data) { 
          this.newRegistrationPlayers = response.data.userData;
        } else {
          console.error('Invalid API response structure:', response);
        }
        });     
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  }
  getNewRegistrationsWithClub(){
    try {
      this.dashboardApi.getNewRegistrationWithRole(2,10).subscribe((response)=>{
        if (response && response.status && response.data) { 
          this.newRegistrationClubs = response.data.userData;
        } else {
          console.error('Invalid API response structure:', response);
        }
        });     
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  }
  getNewRegistrationsWithScout(){
    try {
      this.dashboardApi.getNewRegistrationWithRole(3,10).subscribe((response)=>{
        if (response && response.status && response.data) { 
          this.newRegistrationScouts = response.data.userData;
        } else {
          console.error('Invalid API response structure:', response);
        }
        });     
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  }

  getChardData(){
    try {
    this.dashboardApi.getChartData(2024).subscribe((response)=>{
      if (response && response.status && response.data) {
        this.chartData = response.data;
        setTimeout(() => {
          this.chart1 = this.createChart(this.canvas1.nativeElement, 'canvas1',response.data.sales.labels,response.data.sales.values)!;
          this.chart2 = this.createChart(this.canvas2.nativeElement, 'canvas2',response.data.subscriptions.labels,response.data.subscriptions.values)!;
          this.chart3 = this.createChart(this.canvas3.nativeElement, 'canvas3',response.data.users.labels,response.data.users.values)!;
          // this.chart4 = this.createChart(this.canvas4.nativeElement, 'canvas4')!;
          this.updateChartBackgroundColor();
            
        }, 1000);
       
      } else {
        console.error('Invalid API response structure:', response);
      }
      });     
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
 
  createChart(canvas: HTMLCanvasElement, chartId: string,labels:any,values:any): Chart | null {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error(`Failed to get canvas context for ${chartId}`);
      return null;
    }


    const gradientStroke = ctx.createLinearGradient(100, 0, 700, 0);
    gradientStroke.addColorStop(0, '#7BDA66');
    gradientStroke.addColorStop(0.5, '#236115');
    gradientStroke.addColorStop(1, '#7BDA66');

    const data = {
      labels: labels,
      datasets: [
        {
          data: values,
          borderWidth: 6,
          borderColor: gradientStroke,
          pointBorderWidth: 3, 
          pointBackgroundColor: '#BDE34F',
          pointBorderColor: '#FFFFFF', 
          pointRadius: 10, 
          weight: 700,


          fill: {
            target: 'origin',
            above: 'rgba(11, 149, 100, 0.08)',
          },
        } as ChartDataset<'line'>,
      ],
    };

    return new Chart(ctx, {
      type: 'line',
      data,
      options: {
        layout: {
          padding: 0,
        },
        responsive: true,
        scales: {
          y: {
            stacked: false,
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },

          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: true,
              font: {
                size: 20,
                family: 'poppins,sans-serif',
                weight: 700,
              },
            },
            border: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            tension: 0.5,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: '#E05263',
            titleColor: '#fff',
          
            titleFont: {
              family: 'Poppins',
              size: 20,
              weight: 800,
            },

            callbacks: {
              label: function (tooltipItem: any) {
                return  "Total Users:" + ` ${tooltipItem.raw}`;
              },


            },
            displayColors: false,
          },
        },
      },
    });
  }
  updateChartBackgroundColor() {
    const isDarkMode = this.themeService.isDarkMode();
    const charts = [this.chart1, this.chart2, this.chart3];

    charts.forEach((chart) => {
      if (chart.options && chart.options.scales && chart.options.plugins) {
        if (chart.options.scales['x'] && chart.options.scales['x'].grid) {
          chart.options.scales['x'].grid.color = isDarkMode ? '#333' : '#E0E0E0';
        }
        if (chart.options.scales['y'] && chart.options.scales['y'].grid) {
          chart.options.scales['y'].grid.color = isDarkMode ? '#333' : '#E0E0E0';
        }
        if (chart.options.plugins.tooltip) {
          chart.options.plugins.tooltip.backgroundColor = isDarkMode ? '#BDE34F' : '#E05263';
        }
        chart.options.backgroundColor = isDarkMode ? '#BDE34F' : '#FFFFFF';
        chart.update();
      }

    });

  }


  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
    this.updateThemeText();
    this.updateChartBackgroundColor();
  }

  updateThemeText() {
    const isDarkMode = this.themeService.isDarkMode();
    this.themeText = isDarkMode ? 'Dark Mode' : 'Light Mode';
    document.getElementById('theme-text')!.textContent = this.themeText;
  }

  logout() {
    this.authService.logout();
  }




  ChangeLang(lang: any) {
    const selectedLanguage = typeof lang !== 'string' ? lang.target.value : lang;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
    this.activeLanguage = selectedLanguage;
  }

  toggleSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }

  closeSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }

  toggleLoadmore() {
    const elements = document.querySelectorAll('.Toggle-Notification');
    // console.log(elements);
    elements.forEach(el => {
      el.classList.toggle('d-none');
    });
  }

  getDaysAgo(creationDate: string) {
    const currentDate = new Date(); // Current date
    const createdDate = new Date(creationDate); // Creation date converted to Date object

    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    // Convert milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let text = " days ago";
    if(daysAgo == 1){
      text = " day ago";
    }
    return daysAgo+text;
  }

  generateYears() {
    const startYear = 2024;
    const currentYear = new Date().getFullYear();

    // Populate the years array from startYear to currentYear
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]); // Scrolls to the top-left corner
  }


}

// @Component({
//   selector: 'app-notifications',
//   templateUrl: './notifications.component.html',
//   // styleUrls: ['./notifications.component.css']
//   styleUrls: ['./dashboard.component.scss'],

// })
// export class NotificationsComponent {
//   showAll = false;
//   notifications = [
//     // Array of notifications
//   ];

//   toggleNotifications() {
//     this.showAll = !this.showAll;
//   }
// }




import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Chart, registerables, ChartDataset } from 'chart.js';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3') canvas3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas4') canvas4!: ElementRef<HTMLCanvasElement>;

  lang: string = '';
  chart1!: Chart;
  chart2!: Chart;
  chart3!: Chart;
  chart4!: Chart;

  activeLanguage: string = '';
  themeText: string = 'Light Mode'


  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.updateThemeText();
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.chart1 = this.createChart(this.canvas1.nativeElement, 'canvas1')!;
    this.chart2 = this.createChart(this.canvas2.nativeElement, 'canvas2')!;
    this.chart3 = this.createChart(this.canvas3.nativeElement, 'canvas3')!;
    this.chart4 = this.createChart(this.canvas4.nativeElement, 'canvas4')!;
    this.updateChartBackgroundColor();
  }

 

  createChart(canvas: HTMLCanvasElement, chartId: string): Chart | null {
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
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: [2, 3, 4, 3, 2, 3, 3, 3, 4, 3, 2, 3, 2],
          borderWidth: 4,
          borderColor: gradientStroke,
          pointBorderWidth: 15,
          weight: 600,

        
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
              size: 30,
              weight: 800, 
            },
         
            callbacks: {
              label: function (tooltipItem: any) {
                return ` ${tooltipItem.raw}`;
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
    const charts = [this.chart1, this.chart2, this.chart3, this.chart4];

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
}


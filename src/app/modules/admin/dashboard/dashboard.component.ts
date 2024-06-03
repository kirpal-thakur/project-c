import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  chart1: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];

  colors = 'linear-gradient(90deg, #7BDA66 0%, #236115 51.5%, #7BDA66 100%)';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    Chart.register(...registerables);

    
    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: [2, 3, 4, 3, 2, 3, 3, 3, 4, 3, 2, 3, 2],
            borderWidth: 4,
            borderColor: '#236115',
            pointBorderWidth: 15,
            fill: {
              target: 'origin',
              above: 'rgba(11, 149, 100, 0.08)',
              below: 'rgba(218, 96, 96, 0.08)',
            },
          },
        ],
      },
      options: {
        layout: {
          padding: 0, // Remove padding
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
              display: false,
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
            display: false, // Optionally hide the legend
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: '#E05263', // Background color of tooltip
            titleColor: '#fff',
            titleFont: {
              family: 'Poppins',
              size: 14,
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


    console.log(this.chart1)

    this.chart2 = new Chart('canvas2', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1, 1, 3, 4, 3, 2, 1, 2],
            borderWidth: 4,
            borderColor: '#236115',

            pointBorderWidth: 20,
            spanGaps: false,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false, // Optionally hide grid lines
            },
          },
          x: {
            grid: {
              display: false, // Optionally hide grid lines
            },
          },
        },
        elements: {
          line: {
            tension: 0.4, // Smooth the line
          },
        },
        plugins: {
          legend: {
            display: false, // Optionally hide the legend
          },
        },
      },
    });
    this.chart3 = new Chart('canvas3', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1, 1, 3, 4, 3, 2, 1, 2],
            borderWidth: 4,
            borderColor: '#236115',
            pointBorderWidth: 20,
            spanGaps: false,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false, // Optionally hide grid lines
            },
          },
          x: {
            grid: {
              display: false, // Optionally hide grid lines
            },
          },
        },
        elements: {
          line: {
            tension: 0.4, // Smooth the line
          },
        },
        plugins: {
          legend: {
            display: false, // Optionally hide the legend
          },
        },
      },
    });
    this.chart4 = new Chart('canvas4', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1, 1, 3, 4, 3, 2, 1, 2],
            borderWidth: 4,
            borderColor: '#236115',
            pointBorderWidth: 20,
            spanGaps: false,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false, // Optionally hide grid lines
            },
          },
          x: {
            grid: {
              display: false, // Optionally hide grid lines
            },
          },
        },
        elements: {
          line: {
            tension: 0.4, // Smooth the line
          },
        },
        plugins: {
          legend: {
            display: false, // Optionally hide the legend
          },
        },
      },
    });
  }

  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }

  toggleSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }

  closeSidebar() {
    document.body.classList.toggle('mobile-sidebar-active');
  }
}

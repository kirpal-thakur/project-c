import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  chart1: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];
  constructor(private themeService: ThemeService) {}


  ngOnInit() {

    
    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1,1, 3, 4, 3, 2, 1,2],
            borderWidth: 4,
            borderColor: 'linear-gradient(180deg, #BDE34F 0%, #399E61 100%)',
            pointBackgroundColor: 'red',
           pointBorderWidth:20,
           spanGaps:false,
           fill: false
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
    this.chart2 = new Chart('canvas2', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1,1, 3, 4, 3, 2, 1,2],
            borderWidth: 4,
            borderColor: 'linear-gradient(180deg, #BDE34F 0%, #399E61 100%)',
            pointBackgroundColor: 'red',
           pointBorderWidth:20,
           spanGaps:false,
           fill: false
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1,1, 3, 4, 3, 2, 1,2],
            borderWidth: 4,
            borderColor: 'linear-gradient(180deg, #BDE34F 0%, #399E61 100%)',
            pointBackgroundColor: 'red',
           pointBorderWidth:20,
           spanGaps:false,
           fill: false
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '',
            data: [1, 3, 4, 3, 2, 1,1, 3, 4, 3, 2, 1,2],
            borderWidth: 4,
            borderColor: 'linear-gradient(180deg, #BDE34F 0%, #399E61 100%)',
            pointBackgroundColor: 'red',
           pointBorderWidth:20,
           spanGaps:false,
           fill: false
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
}
  


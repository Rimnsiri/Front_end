import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexMarkers,
} from "ng-apexcharts";
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient } from '@angular/common/http';

export type ChartOptions = {

  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  markers: ApexMarkers[] | any;
};
export type radialChartOptions = {

  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  plotOptions: ApexPlotOptions | any;
  markers: string[] | any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalResponses?: number;
  totalMessages?: number;
  devId?: number; // L'ID du développeur peut être dynamiquement assigné
  developerCount?: number;
  testId?: number;
  enterpriseId?: number; // Remplacez par l'ID de votre entreprise

  acceptedTestsCount?: number;
  public tests: any[] = [];

  public routes = routes;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public radialchartOptions: Partial<ChartOptions> | any;

  constructor(private http: HttpClient) {
    this.chartOptions = {
      series: [
        {
          name: "profile view",
          data: [100, 150, 200, 250, 200, 250, 200, 200, 200, 200, 300, 350],
          colors: ["#FF5B37"],
        }
      ],
      chart: {

        height: 360,

        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },

      stroke: {
        colors: ["#FF5B37"],
        curve: "straight",
        width: [1]
      },

      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      yaxis: {
        lines: {
          show: true,
        }
      },

      markers: {

        size: 4,
        colors: ["#FF5B37"],
        strokeColors: "#FF5B37",
        strokeWidth: 1,
        hover: {
          size: 7,
        }

      },
      grid: {
        position: 'front',
        borderColor: '#ddd',
        strokeDashArray: 7,
        xaxis: {
          lines: {
            show: true
          }
        }
      },

    };


    this.radialchartOptions = {
      series: [85, 75, 60, 40],
      chart: {
        toolbar: {
          show: false
        },
        height: 250,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '50%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          }
        }
      },
      colors: ['#7B46BE', '#FA6CA4', '#FACD3A', '#24C0DC'],
      labels: ['Applied Jobs', 'Messenger', 'Facebook', 'LinkedIn'],
      legend: {
        show: false,
        floating: true,
        fontSize: '16px',
        position: 'bottom',
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0
        },

        itemMargin: {
          vertical: 3
        }
      },
    };
  }
  ngOnInit(): void {
    this.getCompanyTests();
    this.loadResponsesCount();
    this.loadMessagesCount();
    this.loadAcceptedTestsCount();
  }

  loadAcceptedTestsCount(): void {
    const enterpriseId = localStorage.getItem('compteentrepris_id');
    // Utilisez enterpriseId directement, pas this.enterpriseId
    const apiUrl = `http://localhost:8000/api/accepted-tests/count/${enterpriseId}`;
    this.http.get<{ count: number }>(apiUrl)
      .subscribe(
        response => {
          this.acceptedTestsCount = response.count;
        },
        error => {
          console.error('Erreur lors du chargement du nombre de tests acceptés :', error);
        }
      );
  }
  
  loadResponsesCount(): void {
    this.http.get<{ total_responses: number }>(`http://localhost:8000/api/messages/responses/count/${this.devId}`).subscribe({
      next: (data) => {
        this.totalResponses = data.total_responses;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du nombre de réponses', error);
      }
    });
  }

  loadMessagesCount(): void {
    this.http.get<{ total_messages: number }>(`http://localhost:8000/api/messages/count/${this.devId}`).subscribe({
      next: (data) => {
        this.totalMessages = data.total_messages;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du nombre de messages', error);
      }
    });
  }

  loadResponsesCountByEntrepriseId(): void {
    const entrepriseId = localStorage.getItem('compteentrepris_id');
    if (!entrepriseId) {
      console.error('ID de l\'entreprise non trouvé');
      return;
    }

    this.http.get<{ count: number }>(`http://localhost:8000/api/responses/count?test_id=${this.testId}&compteentrepris_id=${entrepriseId}`).subscribe({
      next: (data) => {
        this.totalResponses = data.count;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du nombre de réponses par ID d\'entreprise', error);
      }
    });
  }

  getCompanyTests(): void {
    const companyId = localStorage.getItem('compteentrepris_id');
    if (!companyId) {
      console.error('ID de l\'entreprise non trouvé');
      return;
    }

    this.http.get<any[]>(`http://127.0.0.1:8000/api/company-tests?compteentrepris_id=${companyId}`).subscribe(
      data => {
        this.tests = data;
        console.log('Tests récupérés:', this.tests);
      },
      error => {
        console.error('Erreur lors de la récupération des tests:', error);
      }
    );
  }
}

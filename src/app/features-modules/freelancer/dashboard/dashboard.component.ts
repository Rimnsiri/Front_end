/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild ,ElementRef ,OnInit} from '@angular/core';
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
} from 'ng-apexcharts';
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

export type ChartOptions = {
   
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  colors: any;
  markers: any;
  yaxis: any;
};
export type radialChartOptions = {
   
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  plotOptions: ApexPlotOptions | any;
  colors: string[];
};
interface Skill {
  id?: number;
  name: string;
  pivot: {
    cv_id: number;
    skill_id: number;
    nbrmonth: number;  
    isprincipal: boolean;  
  }
}

interface Education {
  id: number;
  diplome: string;
  école: string;
  startdate: string;  
  enddate: string;    
  description: string;
}
interface Experience {
  id?: number;
  title: string;
  entreprisename: string;
  startdate: string;
  enddate: string;
  description: string;
}

interface CV {
  id: number;
  title: string;
  description: string;
  tjm:number;
  niveau:string;
  english_level:string;
  french_level:string;
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  cvs: CV[] = [];
  selectedCv: CV | null = null;
  selectedCvDetails: any;
  skillsList: any[] = [];
  testCount?: number;
  totalMessages?: number ;
  cvCount?: number;
  devId?: number;
  public routes = routes;
  @ViewChild('updateModal') updateModal!: ElementRef;

  @ViewChild('chart') chart!: ChartComponent;
  public radialchartOptions: Partial<ChartOptions> | any;

  constructor(private http: HttpClient) {
     
  }

  
  ngOnInit() {
    const devIdString = localStorage.getItem('dev_id');
  this.devId = devIdString ? parseInt(devIdString) : 0; // Assuming 0 as a default
  this.loadCvs();
  this.loadSkills();
  this.loadTotalMessages(1);
  if (this.devId) {
    this.loadTestCount(this.devId);
  } else {
    console.error('Developer ID is missing');
  }
  this.devId = Number(localStorage.getItem('developerId'));
  if (this.devId) {
    this.loadCVCount(this.devId);
  } else {
    console.error('Developer ID not found');
  }
  
  }
  loadSkills() {
    this.http.get<any[]>('http://localhost:8000/api/skills').subscribe(
      data => this.skillsList = data,
      error => console.error('Could not load skills.', error)
    );
  }
 
  loadCvs() {
    if (this.devId) {
      this.http.get(`http://127.0.0.1:8000/api/cvs/${this.devId}`).subscribe(
        (data: any) => {
          this.cvs = data;
        },
        error => {
          console.error('Error loading CVs', error);
        }
      );
    }
  }
  loadCvDetails(cvId: number) {
    this.http.get(`http://127.0.0.1:8000/api/cvs/details/${cvId}`).subscribe(
      (data: any) => {
        this.selectedCvDetails = data;
        // Trigger modal here or set a flag to show modal
      },
      error => {
        console.error('Error loading CV details', error);
      }
    );
  }
  deleteCv(cvId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) {
      this.http.delete(`http://127.0.0.1:8000/api/cvs/${cvId}`).subscribe({
        next: (response) => {
          alert('CV supprimé avec succès.');
          this.loadCvs(); 
        },
        error: (err) => {
          alert('Erreur lors de la suppression du CV.');
          console.error(err);
        }
      });
    }
  }

  updateCv(cv: CV) {
    // Formattez les données pour inclure les éducations et les expériences
    const formattedCv = {
      ...cv,
      skills: cv.skills.map(skill => ({
        id: skill.id,
        nbrmonth: skill.pivot.nbrmonth,
        isprincipal: skill.pivot.isprincipal
      })),
      educations: cv.educations.map(edu => ({
        id: edu.id,
        diplome: edu.diplome,
        école: edu.école,
        startdate: edu.startdate,
        enddate: edu.enddate,
        description: edu.description
      })),
      experiences: cv.experiences.map(exp => ({
        id: exp.id,
        title: exp.title,
        entreprisename: exp.entreprisename,
        startdate: exp.startdate,
        enddate: exp.enddate,
        description: exp.description
      }))
    };
  
    this.http.put(`http://127.0.0.1:8000/api/cvs/${cv.id}`, formattedCv).subscribe({
      next: (response) => {
        alert('CV mis à jour avec succès.');
        this.loadCvs();
        this.closeModal(); 
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du CV', error);
        alert('Erreur lors de la mise à jour du CV.');
      }
    });
  }
  
  closeModal() {
    const modalElement = this.updateModal.nativeElement;
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('show');
      document.body.removeChild(modalBackdrop);
    }
    document.body.classList.remove('modal-open');
  }
  
  
  selectCv(cv: CV) {
    this.http.get(`http://127.0.0.1:8000/api/cvs/details/${cv.id}`).subscribe(
      (data: any) => {
        this.selectedCv = data;
        console.log('Selected CV:', this.selectedCv);  // Ajoutez ceci pour voir les détails
      },
      error => {
        console.error('Error loading CV details', error);
      }
    );
  }
  loadTestCount(developerId: number) {
    this.http.get<any>(`http://localhost:8000/api/developer/${developerId}/tests/count`).subscribe(data => {
      this.testCount = data.count;
    }, error => {
      console.error('Erreur lors du chargement du nombre de tests', error);
    });
  }
  loadCVCount(developerId: number) {
    this.http.get<{cv_count: number}>(`http://localhost:8000/api/developer/${developerId}/cv-count`)
      .subscribe(data => {
        this.cvCount = data.cv_count;
      }, error => {
        console.error('Error loading CV count', error);
      });
  }

  loadTotalMessages(developerId: number) {
    this.http.get<{total_messages: number}>(`http://localhost:8000/api/messages/count/${developerId}`)
      .subscribe({
        next: (data) => {
          this.totalMessages = data.total_messages;
        },
        error: (error) => {
          console.error('Error loading total messages', error);
        }
      });
}

}

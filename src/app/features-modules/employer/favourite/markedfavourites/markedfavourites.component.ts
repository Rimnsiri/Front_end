import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerlist } from 'src/app/core/models/models';
import { HttpClient } from '@angular/common/http';
interface ApiResponse {
  responses: any[]; 
}
@Component({
  selector: 'app-markedfavourites',
  templateUrl: './markedfavourites.component.html',
  styleUrls: ['./markedfavourites.component.scss']
})
export class MarkedfavouritesComponent  {
  public like: boolean[] = [false];
  public routes = routes
  public responses: any[] = []; 
  public errorMessage = '';
  freelancer: Array<freelancerlist> = [];
  constructor( public router: Router,private http: HttpClient, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers1.subscribe((data: Array<freelancerlist>) => {
      this.freelancer = data
    })
   }
   toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }
  ngOnInit(): void {
    this.getResponsesByEnterpriseId();
  }

  getResponsesByEnterpriseId() {
    const enterpriseId = localStorage.getItem('compteentrepris_id');
    if (!enterpriseId) {
      console.error('ID de l\'entreprise introuvable dans le stockage local');
      return;
    }

    this.http.get<ApiResponse>(`http://localhost:8000/api/responses/${enterpriseId}`).subscribe(
      (data) => {
        console.log('Données reçues depuis l\'API :', data);
        this.responses = data.responses.map(response => {
          return {
            ...response,
            id: response.id,
            testName: response.accepted_test.nom,
            testDescription: response.accepted_test.description,
            testcategori :response.accepted_test.categorie,
            testniveau : response.accepted_test.niveau,
            devPhoto: `http://localhost:8000/storage/photos/${response.dev.photo}`,
            note: response.note
          };
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des réponses de test :', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la récupération des réponses de test.';
      }
    );
  }
  navigateToAddNote(responseId: number) {
    this.router.navigate([this.routes.employee_invitedfavourites], { queryParams: { responseId } });
  }
}
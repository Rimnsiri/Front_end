import { Component} from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent  {
  entrepriseDetails: any;
  
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    this.getEntrepriDetails();
  }
  getEntrepriDetails(): void {
    // Récupérer l'ID de compte de l'entreprise depuis le localStorage
    const compteentrepriId = localStorage.getItem('compteentrepri_id');
  
    if (!compteentrepriId) {
      console.error('ID de compte entreprise non trouvé dans le localStorage');
      return;
    }
  
    // Appeler l'API pour récupérer les détails de l'entreprise avec l'ID de compte
    this.http.get<any>(`http://127.0.0.1:8000/api/entrepri-details/${compteentrepriId}`).subscribe(
      (response) => {
        this.entrepriseDetails = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'entreprise :', error);
      }
    );
  }

}

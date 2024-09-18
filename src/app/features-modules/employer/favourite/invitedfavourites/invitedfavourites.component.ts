import { Component,  } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerlist } from 'src/app/core/models/models';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-invitedfavourites',
  templateUrl: './invitedfavourites.component.html',
  styleUrls: ['./invitedfavourites.component.scss']
})
export class InvitedfavouritesComponent  {
  public like: boolean[] = [false];
  public routes = routes
  freelancer: Array<freelancerlist> = [];
  public note: number | null = null;
  public response: any = {
    testName: '',
    testcategori: '',
    testniveau: '',
    start_time: '',
    end_time: '',
    devName: '',
    devFirstName: '',
    devPhoto: '',
    note: null
  };
  public errorMessage = '';
  constructor( public router: Router, private route: ActivatedRoute ,private dataservice: ShareDataService, private http: HttpClient,) {
    this.dataservice.ManageUsers1.subscribe((data:Array<freelancerlist>) => {
      this.freelancer = data
    })
   }
   toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }
  ngOnInit(): void {
    const responseId = this.route.snapshot.queryParamMap.get('responseId');
    if (responseId) {
      this.getResponseDetails(parseInt(responseId, 10));
    }
  }
  getResponseDetails(responseId: number) {
    this.http.get<any>(`http://localhost:8000/api/response/${responseId}`).subscribe(
      (data) => {
        const response = data.response;
        this.response = {
          id: response.id,
          reponse: response.reponse,
          testName: response.accepted_test.nom,
          temps:response.accepted_test.duree_estimee,
          testcategori: response.accepted_test.categorie,
          testniveau: response.accepted_test.niveau,
          start_time: response.start_time,
          end_time: response.end_time,
          devName: response.dev.name,
          devFirstName: response.dev.firstname,
          devPhoto: `http://localhost:8000/storage/photos/${response.dev.photo}`,
          note: response.note
        };
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la réponse :', error);
        this.errorMessage = 'Erreur lors de la récupération des détails de la réponse.';
      }
    );
  }
  submitNote(): void {
    if (this.note === null || this.note < 0 || this.note > 20) {
      this.errorMessage = 'Veuillez saisir une note entre 0 et 20.';
      return;
    }

    this.http.post(`http://localhost:8000/api/responses/${this.response.id}/update-note`, { note: this.note })
      .subscribe(
        () => {
          this.response.note = this.note;
          this.note = null; 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la note :', error);
          this.errorMessage = 'Erreur lors de la mise à jour de la note.';
        }
      );
  }
}
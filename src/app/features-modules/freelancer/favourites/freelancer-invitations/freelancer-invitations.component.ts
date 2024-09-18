import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  test_id: number;
  test_name: string;
  note: number;
}


@Component({
  selector: 'app-freelancer-invitations',
  templateUrl: './freelancer-invitations.component.html',
  styleUrls: ['./freelancer-invitations.component.scss']
})
export class FreelancerInvitationsComponent implements OnInit {
  public developerNotes: { id: number, note: number }[] = [];
  public like: boolean[] = [
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  devId: number | null = null; // Variable pour stocker l'ID du développeur
  testId: number | null = null; // Variable pour stocker l'ID du test

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du développeur depuis le stockage local
    this.devId = parseInt(localStorage.getItem('dev_id') || '');

    if (!this.devId || isNaN(this.devId)) {
      console.error('ID du développeur introuvable dans le stockage local');
      return;
    }

    // Appel de la méthode pour récupérer l'ID du test
    this.getTestId();
  }

  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

  getTestId(): void {
    // Faire la requête HTTP pour récupérer l'ID du test du développeur en utilisant son ID
    this.http.get<any>(`http://localhost:8000/api/reponse-tests/test-id/${this.devId}`).subscribe(
      (data) => {
        this.testId = data.test_id; // Stocker l'ID du test récupéré
        // Une fois que vous avez l'ID du test, vous pouvez appeler la méthode getDeveloperNotes pour récupérer les notes du développeur
        this.getDeveloperNotes();
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'ID du test :', error);
      }
    );
  }

  getDeveloperNotes(): void {
    // Faire la requête HTTP pour récupérer la note du développeur en utilisant l'ID du test
    this.http.get<ApiResponse>(`http://localhost:8000/api/reponse-tests/note/${this.testId}`).subscribe(
      (data) => {
        // Ajouter la note récupérée à la liste des notes du développeur
        this.developerNotes.push({ id: this.devId as number, note: data.note });
      },
      (error) => {
        console.error('Erreur lors de la récupération de la note du développeur :', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent {
  public password = '';
  public errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  deleteAccount(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/delete-account';
    const comptedev_id = localStorage.getItem('comptedev_id');
    const formData = {
      comptedev_id: comptedev_id,
      password: this.password,
    };

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
        // Redirigez vers une page de confirmation ou effectuez une autre action appropriée
        if (response.message === 'Compte et profil supprimés avec succès') {
          // Redirigez vers la page d'inscription
          this.router.navigate(['/auth/register']);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.errorMessage = "Une erreur s'est produite lors de la suppression du compte.";
      }
    );
  }

  navigation(): void {
    this.router.navigate([routes.freelancer_membership]);
  }
}

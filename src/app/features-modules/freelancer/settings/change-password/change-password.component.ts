import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  newPassword = ''; // Propriété pour stocker le nouveau mot de passe
  confirmPassword = ''; // Propriété pour stocker la confirmation du mot de passe
  public successMessage = '';
  public errorMessage = '';
  constructor(private http: HttpClient, private router: Router) {}

  changePassword(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/change-password';
    const comptedev_id = localStorage.getItem('comptedev_id');
    const formData = {
      comptedev_id: comptedev_id,
      password: this.newPassword,
      confirm_password: this.confirmPassword,
    };

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
        this.successMessage = response.message; // Stockez le message de succès
        setTimeout(() => {
          this.successMessage = ''; 
          this.router.navigate(['/freelancer/dashboards']); // Naviguez vers le tableau de bord après succès
        }, 1000); // Supprimez le message après 3 secondes (facultatif)
      },
      (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.errorMessage = "Une erreur s'est produite lors du changement de mot de passe.";
      }
    );
  }
  navigation() {
    this.router.navigate([routes.freelancer_portfolio]);
  }
}

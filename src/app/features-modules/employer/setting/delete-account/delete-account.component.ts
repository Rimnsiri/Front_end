import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent  {
  public password = '';
  public errorMessage = '';


  constructor(private http: HttpClient, private router: Router) {}
  deleteAccount(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/delete-accountentrepri';
    const compteentrepriId = localStorage.getItem('compteentrepri_id');
    const formData = {
      compteentrepri_id: compteentrepriId,
      password: this.password,
    };

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
        
        if (response.message === 'Compte  supprimés avec succès') {
          
          this.router.navigate(['/auth/register']);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.errorMessage = "Une erreur s'est produite lors de la suppression du compte.";
      }
    );
  }

}

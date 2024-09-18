import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent  {
  public password: boolean[] = [true];
  public oldPassword = '';
  public newPassword = '';
  public confirmPassword = '';
  public errorMessage = '';

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  constructor(private router: Router,private http: HttpClient) {}

  updatePassword() {
    // Validation côté client
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
        this.errorMessage = "Veuillez remplir tous les champs.";
        return;
    }
    if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Le nouveau mot de passe et la confirmation ne correspondent pas.";
        return;
    }
  
    // Récupérer l'ID de l'entreprise à partir du stockage local
    const compteentrepriId = localStorage.getItem('compteentrepri_id');
  
    // Vérifier si l'ID de l'entreprise est disponible
    if (!compteentrepriId) {
        this.errorMessage = "ID de l'entreprise introuvable.";
        return;
    }
  
    // Requête HTTP pour mettre à jour le mot de passe
    const formData = {
        compteentrepri_id: compteentrepriId,
        password: this.newPassword, // Utiliser le nouveau mot de passe pour les deux champs password et confirmepassword
        confirmepassword: this.newPassword
    };
  
    this.http.post<any>('http://127.0.0.1:8000/api/update-password', formData)
        .subscribe(
            response => {
                console.log(response);
                // Redirection vers une autre page après la mise à jour du mot de passe
                this.router.navigate(['/employer/dashboard'])
            },
            (error: HttpErrorResponse) => {
                // Gestion des erreurs de la requête HTTP
                console.error(error);
                if (error.status === 422) {
                    this.errorMessage = "L'ancien mot de passe est incorrect.";
                } else {
                    this.errorMessage = "Une erreur s'est produite lors de la mise à jour du mot de passe.";
                }
            }
        );
}


  
  ngsubmit(){
    this.router.navigate([routes.freelancer_projects_proposals])
  }



}

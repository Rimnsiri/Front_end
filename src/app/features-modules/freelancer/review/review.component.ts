import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent  {
  devProfile: any = {};
  profileData: any; 
  public routes = routes;
  constructor(private router: Router,private http: HttpClient) {}
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
 
  ngOnInit(): void {
    // Récupérez l'ID de l'utilisateur depuis le stockage local et chargez son profil
    const comptedevIdStr = localStorage.getItem('comptedev_id');
    if (comptedevIdStr) { // Vérifiez si la valeur n'est pas null
      const comptedevId = parseInt(comptedevIdStr, 10);
      this.getProfileData(comptedevId);
    } else {
      // Gérez le cas où 'comptedev_id' n'est pas dans le localStorage,
      // par exemple en redirigeant l'utilisateur vers la page de connexion
      console.log('ID de développeur non trouvé dans le stockage local.');
      this.router.navigate(['/auth/login']);
    }
  }
  

  // Méthode pour récupérer les données de profil du développeur par son ID
  getProfileData(comptedevId: number): void {
    this.http.get(`http://127.0.0.1:8000/api/profile/${comptedevId}`).subscribe(
      (profile: any) => {
        this.profileData = profile; // Stockez les données de profil reçues dans profileData
      },
      (error: any) => {
        // Ici, gérez les erreurs potentielles
        if (error.status === 404) {
          console.error('Profil non trouvé:', error);
          // Peut-être rediriger vers la page de création de profil
          this.router.navigate(['/path/to/creation/profile']);
        } else {
          console.error('Erreur lors de la récupération du profil:', error);
          // Affichez une erreur ou un message approprié
        }
      }
    );
  }
  
  



}

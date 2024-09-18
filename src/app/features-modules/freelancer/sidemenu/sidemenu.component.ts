import { Component } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {
  devProfile: any = {};
  profileData: any; 
  public routes = routes;
  base = '';
  page = '';
  last = '';
  currentroute = '';
  sidebar: SidebarData[] = [];
  constructor(private data: ShareDataService, private common: CommonService ,private router: Router,private http: HttpClient) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
   

    this.menuItems = this.data.freelancer_sidebar;
  }

  public menuItems: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
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

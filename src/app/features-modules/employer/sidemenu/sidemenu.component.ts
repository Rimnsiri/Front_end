import { Component ,OnInit} from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';

import { HttpClient } from '@angular/common/http';
export interface SidemenuItem {
  page: string;
  icon: string;
  menuValue: string;
  separateRoute: boolean;
  showAsTab: boolean;
  showSubRoute: boolean;
  submenu: string;
  expanded: boolean;
  title?: string;
  routes?: boolean;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {
  entrepriseDetails: any;
  public routes = routes;
  base = '';
  page = '';
  last = '';
  currentroute = '';
  sidebar: SidebarData[] = [];
  constructor(
    private data: ShareDataService,
    private common: CommonService,
    private http: HttpClient
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.menuItem = this.data.menuItem;
  }
  ngOnInit(): void {
    this.getEntrepriDetails();
  }
  getEntrepriDetails(): void {
    const compteentreprisId = localStorage.getItem('compteentrepris_id');
    if (!compteentreprisId || isNaN(parseInt(compteentreprisId))) {
      console.error('ID de compte entreprise invalide dans le localStorage');
      return;
    }
  
    // Appeler l'API pour récupérer les détails de l'entreprise avec l'ID de compte
    this.http.get<any>(`http://127.0.0.1:8000/api/entrepri-details/${compteentreprisId}`).subscribe(
      (response) => {
        this.entrepriseDetails = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'entreprise :', error);
      }
    );
  }
  

  public menuItem: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }
}

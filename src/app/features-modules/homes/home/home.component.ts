import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { routes } from 'src/app/core/helpers/routes/routes';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'; // Importez le module NgMultiSelectDropDownModule
interface technologies {
  id: number;
  name: string;
}
interface DeveloperWithNotes {
  id: number;
  // Autres attributs des développeurs
  note: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public routes = routes;
  selected = 'freelancers';
  getLink = "project";
  clinicsslides: any[] = [];
  multiselectDropdownSettings: any;
  technologies: any[] = []; 
devs: any[] = [];
selectedTechnologies: technologies[] = [];
private openAccordions: Set<string> = new Set();
devsWithNotes: DeveloperWithNotes[] = [];
private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
    this.loadSkills();
    // Vérifie si des résultats de recherche existent dans localStorage
    const searchResults = localStorage.getItem('searchResults');
    if (searchResults) {
      // Des résultats de recherche existent, les utiliser
      this.clinicsslides = JSON.parse(searchResults);
      // Optionnel : Effacer les résultats de recherche de localStorage après utilisation
      localStorage.removeItem('searchResults');
    } else {
      // Aucun résultat de recherche, charger tous les développeurs
      this.loadDevelopers();
    }
  
    // Paramètres du dropdown
    this.multiselectDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: '', // ou null
      unSelectAllText: '', // ou null
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.loadDevelopers();
  
  }
  
  

  toggleAccordion(faqId: string): void {
    if (this.openAccordions.has(faqId)) {
      this.openAccordions.delete(faqId);
    } else {
      this.openAccordions.add(faqId);
    }
  }

  isOpen(faqId: string): boolean {
    return this.openAccordions.has(faqId);
  }

  
  onItemSelect(item: any): void {
    console.log('Élément sélectionné :', item);
    // Ajoute l'élément sélectionné au tableau des technologies sélectionnées
    this.selectedTechnologies.push(item);
}

onItemDeselect(item: any): void {
    console.log('Élément désélectionné :', item);
    // Supprime l'élément désélectionné du tableau des technologies sélectionnées
    this.selectedTechnologies = this.selectedTechnologies.filter(t => t.id !== item.id);
}
loadSkills(): void {
  this.http.get<any[]>('http://localhost:8000/api/skills').subscribe(
    (data: any[]) => {
      this.technologies = data; // Stocker les compétences dans le tableau technologies
    },
    error => {
      console.error('Could not load skills.', error);
    }
  );
}
//mta3 recherche skills 
searchDevelopersBySkills(): void {
  const technologiesQueryParam = this.selectedTechnologies.map(t => t.name).join(',');
  this.router.navigate(['/employer/developer'], { queryParams: { technologies: technologiesQueryParam } });
}



loadDevelopers(): void {
  this.http.get<any>('http://localhost:8000/api/devs').subscribe(
    (data: any) => {
      if (Array.isArray(data)) {
        this.clinicsslides = data.map(dev => ({
          img: `http://localhost:8000/storage/photos/${dev.photo}`,
          name: `${dev.name} ${dev.firstname}`,
          subscriptionPrice: dev.tjm,
          id: dev.id,
          niveau:dev.niveau,
          skills: dev.skills.slice(0, 3),

        }));
      } else {
        console.error('Data returned by API is not an array:', data);
      }
    },
    error => {
      console.error('Error fetching developers:', error);
    }
  );
}


  
  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: true
  }

  tetimonialOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      1170: { items: 3 }
    },
    nav: true
  }

 

  companyOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      768: { items: 6 },
      1170: { items: 6 }
    },
    nav: true
  }

  

  search() {
    this.router.navigate(['/employer/developer']); 
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
 

  
  
  
  
  
  
}

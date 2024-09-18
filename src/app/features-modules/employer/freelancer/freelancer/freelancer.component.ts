import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
// Assurez-vous que l'importation de freelancerlist est utilisée ou nécessaire. Si non utilisé, vous pourriez le retirer.
import { Options } from '@angular-slider/ngx-slider';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

interface Technology {
  id: number;
  name: string;
  selected: boolean;
}

interface Data {
  value: string;
}

// Déclaration de l'interface Developer qui manquait
interface Developer {
  img: string;
  name: string;
  tjm: number;
  niveau: string;
  id:number;
  skills: Skill[];
}
export interface Skill {
  name: string;
}
@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss'],
})
export class FreelancerComponent implements OnInit, AfterViewInit {
  
  technologies: any[] = [];
  public like: boolean[] = [false];
  public selected = 'Relevance';
  public selectedPriceRange: string[] = [];
  public routes = routes;
  public searchTerm = '';
  public showSuggestions = true;
  public matchingTechnologies: Technology[] = [];
  public selectedTechnology: Technology | null = null;
  public selectedResults: Technology[] = [];
  public developers: Developer[] = [];
  public value = 500;
  highValue = 0;
  options: Options = {
    floor: 0,
    ceil: 500,
  };
  public developersFound = true; 

  isBeginner = false;
  isSenior = false;
  isExpert = false;
  currentSearchTerm = '';
  ShowFilter = false;
  dropdownSettings: any;
  availableTechnologies: any;

  freelancer: Array<any> = []; // Vérifiez l'utilisation de freelancerlist
  public selectedValue1 = '';
  selectedList1: Data[] = [
    { value: 'Tri par défaut' },
    { value: 'Alphabétique' },
    { value: 'TJM (Tarif Journalier Moyen)' },
    { value: 'Popularité' },
  ];



  public selectedTechnologies: Technology[] = [];
  filteredTechnologies: Technology[] = [];
  private apiUrl = 'http://127.0.0.1:8000/';

  @ViewChild('sliderRange') sliderRange!: ElementRef;

  multiselectDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  constructor(
    private http: HttpClient,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private dataservice: ShareDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private location: Location
  ) {
    this.dataservice.ManageUsers1.subscribe((data: Array<any>) => {
      // Assurez-vous que le type correspond à votre attente
      this.freelancer = data;
    });
  }

  ngOnInit(): void {
    // Charger les compétences et ensuite traiter les paramètres d'URL
    this.loadSkills().then(() => {
      this.activatedRoute.queryParams.subscribe(params => {
        const selectedTechs: string[] = params['technologies'] ? params['technologies'].split(',') : [];
  
        // Pré-sélectionner les technologies
        if (selectedTechs.length > 0) {
          this.prepareTechnologySelection(selectedTechs);
        }
  
        // Extraire et charger les critères de recherche
        if (params['searchCriteria']) {
          const searchCriteria = JSON.parse(decodeURIComponent(params['searchCriteria']));
          this.prepareTechnologySelection(searchCriteria.technologies);
          this.loadDevelopers(searchCriteria);
        } else if (params['technology']) {
          const techFilter = params['technology'];
          this.prepareTechnologySelection([techFilter]);
          const searchCriteria = { technologies: [techFilter] };
          this.loadDevelopers(searchCriteria);
        } else if (selectedTechs.length > 0) {
          const searchCriteria = { technologies: selectedTechs };
          this.loadDevelopers(searchCriteria);
        } else {
          this.loadDevelopers();
        }
      });
    });
  }
  
  loadSkills(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${this.apiUrl}api/skills`).subscribe(
        (data: any[]) => {
          this.technologies = data;
          resolve();
        },
        error => {
          console.error('Could not load skills.', error);
          reject();
        }
      );
    });
  }
  
  prepareTechnologySelection(selectedTechs: string[]): void {
    this.technologies.forEach(tech => {
      tech.selected = selectedTechs.includes(tech.name);
    });
  
    this.selectedTechnologies = this.technologies.filter(tech => tech.selected);
  }
  
  searchFreelancers(): void {
    const searchCriteria = {
      technologies: this.selectedTechnologies.map((t) => t.name),
      niveau: this.updateSelectedNiveau(),
      tjmMin: this.value,
      tjmMax: this.highValue,
    };
    this.updateUrlWithSearchCriteria(searchCriteria);
    this.loadDevelopers(searchCriteria);
  }
  updateUrlWithSearchCriteria(searchCriteria: any): void {
    const queryParams: any = {};
  
    if (searchCriteria.technologies && searchCriteria.technologies.length > 0) {
      queryParams['technologies'] = searchCriteria.technologies.join(',');
    }
    if (searchCriteria.niveau && searchCriteria.niveau.length > 0) {
      queryParams['niveau'] = searchCriteria.niveau.join(',');
    }
    if (searchCriteria.tjmMin !== undefined) {
      queryParams['tjmMin'] = searchCriteria.tjmMin;
    }
    if (searchCriteria.tjmMax !== undefined) {
      queryParams['tjmMax'] = searchCriteria.tjmMax;
    }
  
    const url = this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }).toString();
  
    this.location.go(url);
  }
  
  

updateSelectedNiveau() {
  const selectedNiveau = [];
  if (this.isBeginner) selectedNiveau.push('débutant');
  if (this.isSenior) selectedNiveau.push('Sénior');
  if (this.isExpert) selectedNiveau.push('expert');
  return selectedNiveau;
}


  submitForm() {
    this.router.navigate(['/freelancer/project']);
  }

  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

  togglePriceRange(priceRange: string) {
    const index = this.selectedPriceRange.indexOf(priceRange);

    if (index === -1) {
      this.selectedPriceRange.push(priceRange);
    } else {
      this.selectedPriceRange.splice(index, 1);
    }
  }

  search() {
    console.log(
      'Search button clicked with price range:',
      this.selectedPriceRange
    );
    this.router.navigate(['/freelancer/search-results']);
  }

  reset() {
    this.selectedValue1 = '';
    this.like = this.like.map(() => false);
    this.selectedPriceRange = [];
    this.router.navigate(['/freelancer']);
  }

  isTechnologySelected(technology: Technology): boolean {
    return technology.selected;
  }
  toggleTechnology(technology: Technology): void {
    // Basculer l'état de sélection de la technologie cliquée
    technology.selected = !technology.selected;

    // Mise à jour de la liste des technologies sélectionnées
    if (technology.selected) {
      // Ajouter à la liste des sélectionnées si pas déjà présent
      if (!this.selectedTechnologies.includes(technology)) {
        this.selectedTechnologies.push(technology);
      }
    } else {
      // Supprimer de la liste des sélectionnées si désélectionné
      this.selectedTechnologies = this.selectedTechnologies.filter(
        (t) => t.id !== technology.id
      );
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.trim();
    this.showSuggestions = this.searchTerm === '';

    this.filteredTechnologies = this.technologies.filter(
      (technology) =>
        technology.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        !this.selectedResults.some(
          (selectedTech) => selectedTech.name === technology.name
        )
    );

    if (this.searchTerm !== '') {
      this.matchingTechnologies = this.technologies.filter(
        (technology) =>
          technology.name
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) &&
          !this.selectedResults.some(
            (selectedTech) => selectedTech.name === technology.name
          )
      );
    } else {
      this.matchingTechnologies = [];
    }
  }

  selectResult(technology: Technology): void {
    // Vérifier que la technologie n'est pas déjà sélectionnée
    const isNotSelected = this.selectedResults.every(
      (selectedTech) => selectedTech.name !== technology.name
    );

    if (isNotSelected) {
      this.selectedResults.push(technology);
      console.log('Résultat sélectionné :', this.selectedResults);
    }
  }

  ngAfterViewInit(): void {
    // Assurez-vous que le sliderRange est initialisé avant d'accéder à sa valeur
    if (this.sliderRange) {
      $(this.sliderRange.nativeElement).slider({
        range: true,
        min: 0,
        max: 10000,
        values: [0, 10000],
        step: 100,
        slide: (event: any, ui: any) => {
          // Réagissez aux changements de valeur du slider
          $('#min_price').val(ui.values[0]);
          $('#max_price').val(ui.values[1]);
        },
      });
    }
  }

  deleteResult(technology: Technology): void {
    // Retirer la technologie de la liste des résultats sélectionnés
    this.selectedResults = this.selectedResults.filter(
      (t) => t.name !== technology.name
    );

    // Mettre à jour la propriété 'selected' pour la technologie dans la liste des technologies
    const deletedTechIndex = this.technologies.findIndex(
      (t) => t.name === technology.name
    );
    if (deletedTechIndex !== -1) {
      this.technologies[deletedTechIndex].selected = false;
    }

    // Ne pas filtrer les technologies correspondantes et les technologies filtrées
    // this.filteredTechnologies = this.filteredTechnologies.filter(t => t.name !== technology.name);
    // this.matchingTechnologies = this.matchingTechnologies.filter(t => t.name !== technology.name);

    // Mettre à jour la technologie sélectionnée si nécessaire
    if (
      this.selectedTechnology &&
      this.selectedTechnology.name === technology.name
    ) {
      this.selectedTechnology = null;
    }
  }

  handleKeyUp(event: KeyboardEvent, technology: Technology): void {
    console.log('KeyUp event triggered');
    if (event.key === 'Delete') {
      this.deleteResult(technology);
    }
  }

  public onMinValueInput(): void {
    // Supprimer le '0' si c'est la valeur actuelle
    if (this.value === 0) {
      this.value = 0; // Mettez la valeur à null pour afficher une chaîne vide dans l'input
    }
  }

  updateAvailableTechnologies() {
    // Filtrer les technologies pour exclure celles sélectionnées
    this.availableTechnologies = this.technologies.filter(
      (tech) => !this.isSelected(tech)
    );
  }

  // Vérifier si une technologie est sélectionnée
  isSelected(tech: any): boolean {
    return this.selectedTechnologies.some(
      (selectedTech) => selectedTech.id === tech.id
    );
  }

  // Appelé lorsqu'une technologie est sélectionnée
  onItemSelect(item: any) {
    if (!this.isSelected(item)) {
      this.selectedTechnologies.push(item);
      this.updateAvailableTechnologies(); // S'assurer que cette méthode est appelée
    }
  }

  // Appelé lorsqu'une technologie est désélectionnée
  onItemDeselect(item: any) {
    const index = this.selectedTechnologies.findIndex(
      (tech) => tech.id === item.id
    );
    if (index !== -1) {
      this.selectedTechnologies.splice(index, 1);
      this.updateAvailableTechnologies(); // S'assurer que cette méthode est appelée
    }
  }

  // Met à jour les technologies filtrées
  updateFilteredTechnologies(searchTerm: string) {
    this.filteredTechnologies = this.technologies.filter(
      (tech) =>
        !this.isSelected(tech) && tech.name.toLowerCase().includes(searchTerm)
    );
  }

  // Filtre les technologies en fonction du terme de recherche et de leur sélection
  filterTechnologies(searchTerm = '') {
    this.filteredTechnologies = this.technologies.filter(
      (tech) =>
        tech.name.toLowerCase().includes(searchTerm) && !this.isSelected(tech)
    );
  }
 

  navigateToDeveloperProfile(developerId: number): void {
    console.log('ID du développeur sélectionné :', developerId);
    // Naviguer vers la page des détails du développeur en utilisant l'ID
    this.router.navigate(['/employer/developer-details', developerId]); // Assurez-vous que le chemin d'accès est correct
  }
  
  
  

  
  
  

 loadDevelopers(searchCriteria?: any): void {
  let queryParams = new HttpParams();

  // Vérifiez si des critères de recherche sont spécifiés
  if (searchCriteria) {
    // Inclure les technologies dans les critères de recherche si disponibles
    if (searchCriteria.technologies) {
      queryParams = queryParams.set('searchCriteria', JSON.stringify({
        technologies: searchCriteria.technologies,
      }));
    }

    // Inclure le niveau dans les critères de recherche si disponible
    if (searchCriteria.niveau) {
      // Si les critères de recherche existent déjà, ajoutez le niveau à ces critères
      const existingCriteria = JSON.parse(queryParams.get('searchCriteria') || '{}');
      existingCriteria.niveau = searchCriteria.niveau;
      queryParams = queryParams.set('searchCriteria', JSON.stringify(existingCriteria));
    }

    if (searchCriteria.tjmMin !== undefined || searchCriteria.tjmMax !== undefined) {
      const existingCriteria = JSON.parse(queryParams.get('searchCriteria') || '{}');
      if (searchCriteria.tjmMin !== undefined) {
        existingCriteria.tjmMin = searchCriteria.tjmMin;
      }
      if (searchCriteria.tjmMax !== undefined) {
        existingCriteria.tjmMax = searchCriteria.tjmMax;
      }
      queryParams = queryParams.set('searchCriteria', JSON.stringify(existingCriteria));
    }
  }

  // Effectuer la requête HTTP avec les paramètres de recherche
  this.http.get<any>(`${this.apiUrl}api/devs`, { params: queryParams }).subscribe(
    (data: any[]) => {
      if (Array.isArray(data)) {
        // Les données sont déjà sous forme de tableau
        this.processDevelopers(data);
      } else if (typeof data === 'object') {
        // Convertir l'objet en tableau
        const developersArray = Object.values(data);
        this.processDevelopers(developersArray);
      } else {
        console.error('Erreur: les données retournées ne sont pas dans le format attendu.');
      }
    },
    error => {
      console.error('Erreur lors de la récupération des développeurs:', error);
    }
  );
}

  
  processDevelopers(data: any[]): void {
    this.developers = data.map(dev => ({
      img: `http://localhost:8000/storage/photos/${dev.photo}`,
      name: `${dev.name} ${dev.firstname}`,
      tjm: dev.tjm,
      niveau: dev.niveau,
      id: dev.id,
      skills: dev.skills.slice(0, 3),
    }));
    this.developersFound = this.developers.length > 0;
    console.log("Developers found: ", this.developers);
  }
  


// Fonction pour trier les développeurs par ordre alphabétique
sortDevelopersAlphabetically(): void {
    this.developers.sort((a, b) => a.name.localeCompare(b.name));
}

// Fonction pour trier les développeurs par tarif journalier moyen (TJM)
sortDevelopersByTJM(): void {
    this.developers.sort((a, b) => a.tjm - b.tjm);
}

// Fonction pour trier les développeurs par popularité
sortDevelopersByPopularity(): void {
  // La fonction est vide pour le moment car la popularité des développeurs n'est pas encore implémentée
  console.log("La fonction de tri par popularité n'est pas encore implémentée.");
}


}

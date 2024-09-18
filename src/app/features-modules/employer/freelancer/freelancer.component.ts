import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerlist } from 'src/app/core/models/models';


interface Technology {
  name: string;
  selected: boolean;
}

interface Data {
  value: string;
}

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss']
})
export class FreelancerComponent {
  public like: boolean[] = [false];
  public selected = 'Relevance';
  public selectedPriceRange: string[] = [];
  public routes = routes;
  public searchTerm = '';
  public showSuggestions = true;

  freelancer: Array<freelancerlist> = [];
  public selectedValue1 = '';
  selectedList1: Data[] = [
    { value: 'Sort by (Default)' },
    { value: 'Relevance' },
    { value: 'Rating' },
    { value: 'Popular' },
    { value: 'Latest' },
    { value: 'Free' },
  ];

  public technologies: Technology[] = [
    { name: 'PHP', selected: false },
    { name: 'Java', selected: false },
    { name: 'Python', selected: false },
    { name: 'JavaScript', selected: false },
  ];

  public selectedTechnologies: string[] = [];

  constructor(public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers1.subscribe((data: Array<freelancerlist>) => {
      this.freelancer = data;
    });
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

  // Fonction appelée lorsqu'on clique sur le bouton de recherche
  search() {
    // Ajoutez la logique de recherche ici en utilisant this.selectedPriceRange
    console.log('Search button clicked with price range:', this.selectedPriceRange);

    // Exemple de redirection vers la page de résultats de recherche
    this.router.navigate(['/freelancer/search-results']);
  }

  // Fonction appelée lorsqu'on clique sur le bouton de réinitialisation
  reset() {
    this.selectedValue1 = '';
    this.like = this.like.map(() => false);
    this.selectedPriceRange = [];

    // Exemple de redirection vers la page d'accueil après la réinitialisation
    this.router.navigate(['/freelancer']);
  }

  // Méthode pour vérifier si une technologie est sélectionnée
  isTechnologySelected(technology: Technology): boolean {
    return technology.selected;
  }

  // Méthode pour basculer l'état de sélection d'une technologie
  toggleTechnology(technology: Technology): void {
    technology.selected = !technology.selected;

    // Ajouter ou retirer la technologie de la liste sélectionnée
    if (technology.selected) {
      this.selectedTechnologies.push(technology.name);
    } else {
      this.selectedTechnologies = this.selectedTechnologies.filter(
        (selectedTech) => selectedTech !== technology.name
      );
    }
  }

 
 onSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log('Search input:', target.value);
  this.searchTerm = target.value.trim();

  // Mettez à jour la valeur de showSuggestions en fonction de la présence de texte dans la zone de recherche
  this.showSuggestions = this.searchTerm === '';

  // Mise à jour automatique de la sélection des technologies en fonction du terme de recherche
  this.technologies.forEach(technology => {
    technology.selected = technology.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  });
}


}

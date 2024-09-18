import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;

  public routes = routes;
  sticky = false;
  elementPosition: number | undefined;
  base = '';
  base1 = '';
  page = '';
  last = '';

  navbar: Array<header> = [];
  public header_bg = false;

  constructor(
    private Router: Router,
    private data: ShareDataService,
    private navservices: NavbarService,
    private router: Router,
    private common: CommonService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
      this.base1 = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
  
    this.navbar = [
      { tittle: 'Domaines d’expertise', route: '/home', fragment: 'domaines_expertise', showAsTab: true, separateRoute: true },
      { tittle: 'Entreprises', route: '/home', fragment: 'entreprises', showAsTab: true, separateRoute: true },
      { tittle: 'Questions', route: '/home', fragment: 'faq', showAsTab: true, separateRoute: true }
    ];
    
    
  }
  
  clearLocalStorage() { 
    localStorage.clear(); 
  }
  employer() {
    localStorage.setItem('employer', 'employer');
  }

  freelancer() {
    localStorage.setItem('freelancer', 'freelancer');
  }

  otherPages(val: string) {
    localStorage.setItem(val, val);
  }

  home() {
    this.Router.navigate(['/home']);
  }
  esn() {
    this.Router.navigate(['/home']);
  }

  public toggleSidebar(): void {
    this.navservices.openSidebar();
  }

  public hideSidebar(): void {
    this.navservices.closeSidebar();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (this.elementPosition && windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (windowScroll == 0) {
      this.header_bg = false;
    } else {
      this.header_bg = true;
    }
  }
  
  scrollToSection(sectionId: string, event: MouseEvent): void {
    event.preventDefault(); // Empêche le comportement par défaut du lien
  
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80; // Ajustez ce décalage selon votre mise en page
        window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset + yOffset, behavior: 'smooth' });
      }
    };
  
    const element = document.getElementById(sectionId);
    if (element) {
      scrollToElement();
    } else {
      // Utilise Router.navigate pour naviguer vers la page d'accueil, puis exécute le scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(scrollToElement, 100); // Attendez un court instant avant de faire défiler pour laisser le temps à Angular de charger la page
      });
    }
  }
  
  navigateToDeveloper(): void {
    this.router.navigate(['/employer/developer']).then(() => {
      // Optionnellement, forcer le défilement vers le haut de la page
      window.scrollTo(0, 0);
    });
  }
   // Vérifie si l'URL courante contient '/faq'
   get isFaqPage(): boolean {
    return this.router.url.includes('/faq');
  }
  get isAboutPage(): boolean {
    return this.router.url.includes('/pages/about'); // Remplacer '/contact' par le chemin réel de votre page de contact
  }
  get isstarterPage(): boolean {
    return this.router.url.includes('/pages/blank-page'); // Remplacer '/contact' par le chemin réel de votre page de contact
  }
  get isprivacyPage(): boolean {
    return this.router.url.includes('/pages/privacy-policy'); // Remplacer '/contact' par le chemin réel de votre page de contact
  }
  get islocauxPage(): boolean {
    return this.router.url.includes('/pages/locaux'); // Remplacer '/contact' par le chemin réel de votre page de contact
  }
  get ishisPage(): boolean {
    return this.router.url.includes('/pages/his'); // Remplacer '/contact' par le chemin réel de votre page de contact
  }
  get isEnsPage(): boolean {
    return this.router.url.includes('pages/esn'); // Remplacer '/esn' par le chemin réel de votre page de contact
  }
}

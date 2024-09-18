import { Component, AfterViewChecked ,ViewChild ,ElementRef} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements AfterViewChecked {
  @ViewChild('responseInput') responseInput!: ElementRef;
  public routes = routes;
  private lightGallery!: LightGallery;
  private needRefresh = false;

  public messages: any[] = [];
  public selectedMessage: any = null;





  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const entrepriseEmail = localStorage.getItem('entreprise_email');
    if (entrepriseEmail) {
      // Utiliser l'email de l'entreprise pour récupérer les messages
      this.getMessages(entrepriseEmail); // Passer seulement l'email comme paramètre
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion si les données nécessaires ne sont pas disponibles
    }
  }
  
  getMessages(entrepriseEmail: string): void {
    const apiUrl = `http://127.0.0.1:8000/api/entreprise/messages/${entrepriseEmail}`;
  
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API pour les messages:', response);
        this.messages = response;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des messages:', error);
        // Redirection si non authentifié
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
  
  selectMessage(message: any): void {
    this.selectedMessage = message; 
  }

  trackByMessages(index: number, message: any): number {
    return message.id;
  }

  submitResponse(response: string): void {
    console.log('Envoyer la réponse');
    const entrepriseEmail = localStorage.getItem('entreprise_email');
    if (entrepriseEmail) {
      const apiUrl = `http://127.0.0.1:8000/api/entreprise/messages/${entrepriseEmail}`;
      const body = { email: entrepriseEmail, response: response };  // Utilisation de 'response' au lieu de 'message'
      this.http.post(apiUrl, body).subscribe(
        (response: any) => {
          console.log('Réponse du backend:', response);
          this.responseInput.nativeElement.value = ''; 
          this.messages.push({
            ...response,
            newSession: true,
            created_at: new Date() 
          });
        },
        (error: any) => {
          console.error('Erreur lors de envoi du message:', error);
        }
      );
    }
  }
  
  

  

  
  
  

  settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
     
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
 
  public showSearch = false;
  search2 = false;
  userInfo = true;
  mobChat1 = false;

  closeButton() {
    this.showSearch = false;
  }
  showSearch2() {
    this.search2 = true;
  }
  hideSearch2() {
    this.search2 = false;
  }
  hideUserDetail() {
    this.userInfo = false;
    const isResponsive = window.matchMedia('(max-width: 992px)').matches;
    if (isResponsive) {
      this.mobChat1 = false;
    }
  }
  showUserDetail() {
    this.userInfo = true;
    const isResponsive = window.matchMedia('(max-width: 992px)').matches;
    if (isResponsive) {
      this.mobChat1 = true;
    }
  }
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Space') {
      // Handle the key press here, e.g., trigger the same action as the click event
      this.hideSearch2();
    }
  }
 
}

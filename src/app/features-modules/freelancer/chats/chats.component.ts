import { AfterViewChecked, Component,OnInit ,ViewChild, ElementRef  } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements AfterViewChecked {
@ViewChild('responseInput') responseInput?: ElementRef;

messages: any[] = [];
  selectedUser: any = { response: '', responseArray: [] };
 // Utilisé pour les détails du chat
   
  selectedUserMessages: any[] = []; 
  public routes = routes;
  private lightGallery!: LightGallery;
  private needRefresh = false;
  devProfile: any = {};
  profileData: any; 

  constructor(private http: HttpClient,private router: Router,) {}
  ngOnInit(): void {
    this.loadMessages();
    this.selectedUser = { id: null, response: '', responseArray: [] }; 
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
  selectUser(user: any): void {
    this.selectedUser = user;
    this.selectedUser.responseArray = user.response ? user.response.split('\n') : [];
    const selectedUserMessages = this.messages.find(msg => msg.email === user.email)?.message || '';
    this.selectedUserMessages = selectedUserMessages.split('\n');
  }
  
  loadMessages(): void {
    const devId = localStorage.getItem('dev_id');
    const apiUrl = `http://127.0.0.1:8000/api/messages?dev_id=${devId}`;
    
    this.http.get(apiUrl).subscribe(
      (response: any) => {
          console.log("Response from API: ", response);
          this.messages = response;
          
          this.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          const today = new Date().toLocaleDateString();
          this.selectedUserMessages = this.messages.filter(msg => new Date(msg.timestamp).toLocaleDateString() === today);
         
      },
      (error: any) => {
          console.error('Erreur lors de la récupération des messages:', error);
      }
  );
  
  }

  sendResponse(response: string): void {
    if (!this.selectedUser || !this.selectedUser.id) {
      console.error('Aucun utilisateur sélectionné ou ID utilisateur manquant.');
      return;  // Assurez-vous qu'un utilisateur est sélectionné avant d'envoyer une réponse
    }
    const responsePayload = {
      response: response,
    };
    const apiUrl = `http://127.0.0.1:8000/api/contactdevs/${this.selectedUser.id}/respond`;
  
    this.http.post(apiUrl, responsePayload).subscribe(
      (resp: any) => {
        console.log("Response from API: ", resp);
        // Ajoutez la nouvelle réponse à responseArray pour l'affichage immédiat
        if (this.selectedUser.response) {
          this.selectedUser.response += ' || ' + response;  // Mettez à jour la chaîne de réponse concaténée
        } else {
          this.selectedUser.response = response;
        }
        this.selectedUser.responseArray = this.selectedUser.response.split(' || ');  
        this.reloadUserMessages();  
        if (this.responseInput) {
          this.responseInput.nativeElement.value = '';  
        }
      },
      (error: any) => {
        console.error('Error sending response:', error);
      }
    );
  }
  reloadUserMessages(): void {
    this.selectUser(this.selectedUser); 
  }
  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return ''; 
    }
  }
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

import { Component, OnInit,HostListener  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import {  ViewChildren, ElementRef, QueryList } from '@angular/core';
@Component({
  selector: 'app-affichetest',
  templateUrl: './affichetest.component.html',
  styleUrls: ['./affichetest.component.scss']
})
export class AffichetestComponent implements OnInit {
  @ViewChildren('reponseInput') reponseInputs: QueryList<ElementRef>;
  showAlert: boolean = false;
  reponseTestInstance: any; 
  successMessage: string = '';
  timer: any;
  cheatingAttempts: number = 0;
testId: number | undefined; 
  public routes = routes;
  public tests: any[] = [];
  public developerPassword: string = '';
  public showPdf: boolean = false; // Variable pour contrôler l'affichage du PDF
  public showPdfButton: boolean = true;
  public showReponses: boolean = false;
  public dureeRestante: number = 0;
  public tempsEcoule: number = 0;
  public pdfUrl: SafeResourceUrl | undefined; // Stocker l'URL sécurisée du PDF
  reponse: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { this.showReponses = false;
    this.showReponses = false;
    this.reponseInputs = new QueryList<ElementRef>();
   }

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.route.params.subscribe(params => {
      console.log("Paramètres de l'URL :", params);
      if (params['id']) {
        this.developerPassword = params['id'];
        console.log("Mot de passe du développeur :", this.developerPassword);
        // Convertir le paramètre 'id' en nombre
        const testId = Number(this.developerPassword);
        if (!isNaN(testId)) {
          console.log("ID du test à récupérer :", testId);
          this.getAcceptedTest(testId);
        } else {
          console.error("L'ID du test n'est pas un nombre valide.");
        }
      } else {
        console.error("Aucun ID de test trouvé dans les paramètres de l'URL.");
      }
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.developerPassword = params['id'];
        const testId = Number(this.developerPassword);
        if (!isNaN(testId)) {
          this.testId = testId; // Récupération de l'ID du test depuis l'URL
        } else {
          console.error("L'ID du test n'est pas un nombre valide.");
        }
      } else {
        console.error("Aucun ID de test trouvé dans les paramètres de l'URL.");
      }
    });
  
  }
  

  

  
  getAcceptedTest(id: number): void {
    console.log("Récupération du test accepté avec l'ID :", id);
    this.http.get<any>('http://localhost:8000/api/accepted_tests/' + id).subscribe(
      (test) => {
        console.log("Test récupéré avec succès :", test);
        localStorage.setItem('compteentreprise_id', test.compteentrepris_id);
        console.log('ID de entreprise :', test.compteentrepris_id);
        this.tests = [test];
        // Initialiser la durée restante avec la durée estimée du test
        this.dureeRestante = this.tests[0].duree_estimee * 60;
        // Récupérer l'URL sécurisée du PDF une fois
        this.pdfUrl = this.getSafeUrl(test.fichier_pdf);
      },
      (error) => {
        console.error('Erreur lors de la récupération du test accepté :', error);
      }
    );
  }
 


  getSafeUrl(fileName: string): SafeResourceUrl {
    const path = `http://localhost:8000/storage/tests/${fileName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

  afficherPdf(): void {
    this.showPdf = !this.showPdf; // Inverser la valeur de showPdf lorsque le bouton est cliqué
    this.showPdfButton = false; // Cacher le bouton après avoir affiché le PDF
  }
  

 
 

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.dureeRestante > 0) {
        this.dureeRestante--;
        this.tempsEcoule = this.tests[0].duree_estimee * 60 - this.dureeRestante;
      } else {
        clearInterval(this.timer);
        console.log("Temps écoulé !");
        this.envoyerReponses(); // Appel automatique de la fonction d'envoi des réponses lorsque le temps est écoulé
      }
    }, 1000);
  }
  

formatTime(timeInSeconds: number): string {
    const minutes: number = Math.floor(timeInSeconds / 60);
    const seconds: number = Math.floor(timeInSeconds % 60);
    return `${minutes} minutes et ${seconds} secondes`;
}



  updateReponse(): void {
    // Ne rien faire ici, cette fonction est juste utilisée pour déclencher la mise à jour de ngModel
  }
  commencerTest(): void {
    if (this.testId) {
      this.showPdfButton = false;
      this.showReponses = true;
      const developerId = localStorage.getItem('developerId');
      const compteentrepriseId = localStorage.getItem('compteentreprise_id');
    console.log('ID du développeur récupéré depuis le stockage local:', developerId);
    console.log('ID de l\'entreprise récupéré depuis le stockage local:', compteentrepriseId);

   
      // Appel API pour enregistrer le temps de début avec l'ID du test
      this.http.post('http://localhost:8000/api/updateStartTime', { id_test: this.testId ,id_devp: developerId ,compteentrepris_id: compteentrepriseId })
          .subscribe(
              (response: any) => {
                  console.log('start_time enregistré avec succès :', response);
                  // Initialiser la durée restante avec la durée estimée du test (en secondes)
                  this.dureeRestante = this.tests[0].duree_estimee * 60;

                  // Démarrer le chronomètre
                  this.startTimer();
              },
              (error: any) => {
                  console.error('Erreur lors de l\'enregistrement du start_time :', error);
              }
          );
    } else {
      console.error("ID du test non défini. Impossible de commencer le test.");
    }
     // Enregistrer l'ID du test dans le stockage local
     if (this.testId) {
      localStorage.setItem('testId', this.testId.toString());
    }
    
  }
  @HostListener('document:visibilitychange', ['$event'])
handleVisibilityChange(event: Event): void {
    if (document.visibilityState === 'visible') {
        // Vérifier si l'ID du test est présent dans le stockage local
        const testId = localStorage.getItem('testId');

        if (testId) {
            let attempts = localStorage.getItem('attempts');
            let attemptCount = attempts ? parseInt(attempts) : 0;

            if (attemptCount < 3) { // S'il reste des tentatives
                const alertShown = sessionStorage.getItem('alertShown');

                if (alertShown !== 'true') { // Si l'alerte n'a pas déjà été affichée
                    alert('Veuillez ne pas basculer entre les pages pendant le test, sinon votre test sera annulé. Vous avez ' + (3 - attemptCount) + ' essais restants.');
                    sessionStorage.setItem('alertShown', 'true');

                    // Temporisation pour fermer l'alerte après 5 secondes
                    setTimeout(() => {
                        sessionStorage.removeItem('alertShown'); // Supprimer l'indicateur d'alerte affichée
                        alert(''); // Fermer l'alerte
                    }, 5000); // 5000 millisecondes = 5 secondes
                }

                localStorage.setItem('attempts', (attemptCount + 1).toString());
            } else { // Si l'utilisateur a atteint le nombre maximal de tentatives
                localStorage.removeItem('attempts');
                alert('Nombre maximal de tentatives de basculement entre les pages atteint. Votre test est annulé.');

                // Rediriger l'utilisateur vers la page des tests
                this.router.navigate(['/employer/test']);
            }
        }
    }
}

  
  
  envoyerReponses() {
    const apiUrl = 'http://localhost:8000/api/updateEndTime'; // Modifier l'URL pour correspondre à la nouvelle méthode dans le backend
    const formData = new FormData();
  
    // Assurez-vous que le champ "reponse" est rempli
    if (this.reponse) {
      formData.append('reponse', this.reponse);
  
      // Continuez avec la logique d'envoi de la requête HTTP
      this.http.post(apiUrl, formData)
        .subscribe(
          (response: any) => {
            console.log('Réponse enregistrée avec succès :', response);
            this.reponse = '';
            this.successMessage = 'Réponses envoyées avec succès !';
            clearInterval(this.timer);
            console.log('Timer stopped');
            this.checkCheatingAttempts();
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/employer/test']);
            }, 1000);
          },
          (error: any) => {
            console.error('Erreur lors de l\'enregistrement de la réponse :', error);
          }
        );
    } else {
      console.error('Le champ "reponse" est requis.');
    }
  }
  




  // Fonction pour vérifier les tentatives de tricherie
  checkCheatingAttempts() {
    if (this.cheatingAttempts >= 3) {
      // Terminer le test si le nombre maximal de tentatives de tricherie est atteint
      console.log("Nombre maximal de tentatives de tricherie atteint. Le test est terminé.");
      // Ajoutez ici le code pour terminer le test ou rediriger l'utilisateur vers une page appropriée.
    }
  }
  
  }

  
   



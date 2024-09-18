import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  developerEmail: string = '';
  public routes = routes;
  public errorMessage: string = '';
  public testTitle: string = '';
  public testCategory: string = '';
  public testLevel: string = '';
  public testDuration: number = 0;
  public testDescription: string = '';
  public testFile: File | null = null;
  public rightsCheckbox: boolean = false;
  public termsCheckbox: boolean = false;
  showValidationMessage: boolean = false;
  bothCheckboxesChecked: boolean = false;
  public keyword: string = '';
  password: string = '';
  public companyPassword: string = '';
  public showCompanyPassword: boolean = false;
 
  test: any;
  public developerPassword: string = '';
  public showDeveloperPassword: boolean = false;
  showPassword: boolean = false;
  @ViewChild('proposerSection') proposerSection!: ElementRef;
  @ViewChild('passer') passerButton!: ElementRef | null;
  
  scrollToProposerSection() {
    this.proposerSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}
passerLeTest() {
  if (this.passerButton) { // Vérifiez si passerButton n'est pas null
    this.passerButton.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}

saveData(developerEmail: string, developerPassword: string) {
  const formData = {
    developerEmail: developerEmail,
    developerPassword: developerPassword
  };

  return this.http.post('http://localhost:8000/api/enregistests', formData);
}

startTest(): void {
  // Appel à la méthode saveData() pour enregistrer les données
  this.saveData(this.developerEmail, this.developerPassword).subscribe(
    (response: any) => {
      // Gestion de la réponse
      const developerId = response.developer_id;
      localStorage.setItem('developerId', developerId);
      let params = new HttpParams().set('keyword', this.developerPassword);
      params = params.set('id_devp', developerId);
      this.http.get<{valid: boolean, testId?: number, test?: any}>('http://localhost:8000/api/verify-test', { params }).subscribe(
        response => {
          if (response.valid) {
            console.log('ID du développeur:', developerId);
            this.router.navigate(['/employer/affichetest', response.testId], { state: { test: response.test } }); 
          } else {
            alert('Mot de passe incorrect.');
          }
        },
        error => {
          console.error('Erreur lors de la validation du mot de passe :', error);
        }
      );
    },
    error => {
      console.error('Erreur lors de l\'enregistrement des données :', error);
      // Gestion des erreurs
      if (error.status === 400) {
        alert('Erreur lors de l\'enregistrement des données : ' + error.error.message);
      } else {
        alert('Une erreur s\'est produite lors de l\'enregistrement des données.');
      }
    }
  );
}



  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) {
    this.passerButton = null; 
   }


  updateButtonState() {
    this.bothCheckboxesChecked = this.rightsCheckbox && this.termsCheckbox;
    this.showValidationMessage = false;
  }

  validateForm() {
    if (!this.bothCheckboxesChecked) {
      this.showValidationMessage = true;
    } else {
      // Logique de validation supplémentaire ici
    }
  }

  viewTest() {
    const fileInput = document.getElementById('test-file') as HTMLInputElement; // Utilisez l'ID correct pour votre champ de fichier
  
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
      } else {
        console.error('Le fichier sélectionné n\'est pas de type PDF.');
      }
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }
  

  // Ajoutez la méthode onFileSelected
  onFileSelected(event: Event) {
    // Vous pouvez mettre ici la logique pour traiter la sélection du fichier
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const compteentreprisId = localStorage.getItem('compteentrepris_id');
    if (!compteentreprisId) {
      console.error('ID de l\'entreprise non trouvé');
      return;
    }
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append('compteentrepris_id', compteentreprisId);
    formData.append('company_password', this.companyPassword); // Ajoutez le champ companyPassword à formData

    this.http.post<any>('http://localhost:8000/api/tests', formData).subscribe(
        response => {
            console.log('Réponse du serveur:', response);
            alert('Le test a été soumis avec succès !');
             // Réinitialiser les valeurs des champs du formulaire à vide
          this.testTitle = '';
          this.testCategory = '';
          this.testLevel = '';
          this.testDuration = 0;
          this.testDescription = '';
          this.testFile = null;
          this.rightsCheckbox = false;
          this.termsCheckbox = false;
          this.companyPassword = '';
        },
        (error: HttpErrorResponse) => {
            console.error('Erreur lors de la soumission du test:', error);
            if (error.error && typeof error.error === 'object') {
                this.errorMessage = Object.values(error.error).join(', ');
            } else {
                this.errorMessage = 'Une erreur s\'est produite lors de la soumission du test.';
            }
            alert(this.errorMessage);
        }
    );
}

toggleCompanyPasswordVisibility() {
  this.showCompanyPassword = !this.showCompanyPassword;
}

toggleDeveloperPasswordVisibility() {
  this.showDeveloperPassword = !this.showDeveloperPassword;
}

}

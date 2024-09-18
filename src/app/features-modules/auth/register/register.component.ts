import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router depuis @angular/router
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formEntreprise!: FormGroup;
  rememberPassword = false;
  registrationSuccess = false;
  errorMessage = '';
  public routes = routes;
  public taskList: string[] = [];
  


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {} // Injecter Router dans le constructeur

// Ajustez les validations selon vos besoins
ngOnInit(): void {
  this.formEntreprise = this.fb.group({
    nom: ['', Validators.required], 
    domaine: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmepassword: ['', Validators.required],
  });
  this.form = this.fb.group({
    nom: ['', Validators.required], 
    prénom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmepassword: ['', Validators.required],
  });


}



register(formData: any): void {
  console.log('Tentative de soumission du formulaire');
  const apiUrl = 'http://127.0.0.1:8000/api/register';
  this.http.post(apiUrl, formData).subscribe(
    (response) => {
      console.log('Réponse de l\'API:', response);
      this.registrationSuccess = true;
      this.errorMessage = '';
      this.router.navigate(['/auth/login']).then(() => {
        window.location.reload();
      });
    },
    (error) => {
      console.error('Erreur lors de la requête vers l\'API:', error);
      this.errorMessage = error.error.message || "Une erreur s'est produite lors de l'inscription.";
      this.registrationSuccess = false;
    }
  );
}

registerentreprise(formData: any): void {
  console.log('Tentative de soumission du formulaire');
    const apiUrl = 'http://127.0.0.1:8000/api/registerentreprise';
    this.http.post(apiUrl, formData).subscribe(
      (response)=> {
        console.log('Réponse de l\'API:', response);
        this.registrationSuccess = true;
        this.errorMessage = '';
        this.router.navigate(['/auth/loginemplye']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.errorMessage = error.error.message || "Une erreur s'est produite lors de l'inscription.";
        this.registrationSuccess = false;
      }
    );
  
}

  public password: boolean[] = [true];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  login() {
    this.router.navigate([routes.freelancer_onboard]); // Utiliser router au lieu de Router
  }

  submitForm() {
    this.router.navigate([this.routes.freelancer_onboard]); // Utiliser router au lieu de Router
  }
}

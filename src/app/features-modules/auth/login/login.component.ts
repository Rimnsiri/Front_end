import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { WebStorage } from 'src/app/core/storage/web.storage';
import { Router } from '@angular/router'; // Importer Router depuis @angular/router
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms'; // Modifier ici

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnDestroy{
  public password: boolean[] = [true];
  public routes = routes;
  public Toggledata = true;
  public subscription: Subscription;
  public CustomControler: unknown;
  public errorMessage = ''; // Ajouter ici
  successMessage: string | null = null;

  form!: FormGroup; 

  constructor(private storage: WebStorage, private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != '0') {
        this.CustomControler = data;
      }
    });
    this.form = this.fb.group({
      email: ['', [Validators.required]], // Laissez le champ vide
      password: ['', [Validators.required]] // Laissez le champ vide
    });
  }
  
  ngOnInit() {
    this.storage.Checkuser();
    localStorage.removeItem('LoginData');
    this.successMessage = localStorage.getItem('successMessage');
    localStorage.removeItem('successMessage'); // Assurez-vous de le supprimer après l'avoir récupéré
  }
  
  
  login(): void {
    console.log('Tentative de connexion');
    const apiUrl = 'http://127.0.0.1:8000/api/login';
    const formData = this.form.value;
  
    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
        this.successMessage="Bienvenu";
        // Stockez les données de l'utilisateur pour une utilisation 
        localStorage.setItem('comptedev_id', response.comptedev_id.toString());
        
        // Stockez également le dev_id s'il est disponible
        localStorage.setItem('dev_id', response.dev_id ? response.dev_id.toString() : '');
  
        // Vérifiez si le développeur a déjà un profil
        if (response.has_profile) {
          // Si le profil existe, redirigez vers le tableau de bord
          this.router.navigate(['/freelancer/dashboards']);
        } else {
          // Si le profil n'existe pas, redirigez vers la création de profil
          this.router.navigate(['/pages/onboard-screen']);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.errorMessage = "Votre mot de passe est incorrect.";
      }
    );
  }
  
  
  
  
  
  
  
  
  

  
  submit() {
    this.storage.Login(this.form.value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}

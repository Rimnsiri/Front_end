import { Component, OnInit, HostListener,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements AfterViewInit {
  public isCheckboxChecked = true;
  form!: FormGroup;

  largeurEcran: number | undefined;
  estActif = false;
  isMobile = false;
  isLargeScreen = false;
  routes = {
    home: '/home',
  };

  public taskList: string[] = [];
  public newTask = '';
  public phoneList: string[] = [];
  public newPhone = '';
  public msgList: string[] = [];
  public newMsg = '';
  messageEnvoye = false;
  messageErreur = '';

  ngAfterViewInit(): void {
    
    AOS.init({
      duration: 1000,  
      once: true       
    });
  }
  addTask(): void {
    if (this.newTask.trim().length) {
      this.taskList.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  addPhone(): void {
    if (this.newPhone.trim().length) {
      this.phoneList.push(this.newPhone.trim());
      this.newPhone = '';
    }
  }

  addMsg(): void {
    if (this.newMsg.trim().length) {
      this.msgList.push(this.newMsg.trim()); // Correction : Utilisez newMsg au lieu de newPhone
      this.newMsg = '';
    }
  }
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
    });
  }
  submitForm() {
    if (this.form.valid) {
      // Envoyer les données au backend ou à Formspree
      this.http
        .post('https://formspree.io/f/mgegpjge', this.form.value)
        .subscribe(
          (response) => {
            console.log('Réponse de Formspree:', response);
            // Afficher le message de succès
            this.messageEnvoye = true;
            this.messageErreur = '';
            // Recharger la page après un certain délai
            setTimeout(() => {
              window.location.reload();
            }, 1000); // Recharge après 1 seconde
          },
          (error) => {
            console.error(
              "Erreur lors de l'envoi du formulaire à Formspree:",
              error
            );
            // Gérer l'erreur si nécessaire
          }
        );
    }
  }

  ajouterMsg(): void {
    console.log('Tentative de soumission du formulaire');
    if (this.form.valid) {
      const url = 'http://127.0.0.1:8000/api/contact';
      this.http.post<any>(url, this.form.value).subscribe({
        next: (response: any) => {
          console.log("Réponse de l'API", response);
          this.messageEnvoye = true;
          this.messageErreur = '';
          // Attendre 1 secondes avant de rafraîchir la page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (error: any) => {
          console.error("Erreur de l'API", error);
          this.messageErreur =
            "Une erreur s'est produite lors de l'envoi du message.";
          this.messageEnvoye = false;
        },
      });
    } else {
      console.log("Le formulaire n'est pas valide.");
      console.log(this.form.errors);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
    this.isLargeScreen = window.innerWidth > 1200;
  }

  getMarginRight(): number {
    if (this.isLargeScreen) {
      return -20;
    } else {
      return 80;
    }
  }

  resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  toggle() {
    this.estActif = !this.estActif;
  }
}

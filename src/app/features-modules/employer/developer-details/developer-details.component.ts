import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'core-js/es/map';

interface Skill {
  id?: number;
  name: string;
  image: string;
  pivot: {
    cv_id: number;
    skill_id: number;
    nbrmonth: number;
    isprincipal: boolean;
  };
}
@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.scss']
})
export class DeveloperDetailsComponent implements OnInit, OnDestroy {
  devId: number | null = null;
  form!: FormGroup;
  mainSkills: Skill[] = [];
  otherSkills: Skill[] = [];
  // Contrôler l'affichage des compétences
  showAllSkills = false;
  public routes = routes;
  boutonTexte = "OFF";
  estActif = false;
  public details = [];
  public dev: any;
  public cv: any;
  public taskList: string[] = [];
  public newTask = '';
  public phoneList: string[] = []; 
  public newPhone = ''; 
  public msgList: string[] = [];
  public newMsg = '';
  public isCheckboxChecked = true;   
   messageEnvoye = false;
  messageErreur ='';
  onMouseOver(skill: Skill): void {
    // Logique à exécuter lorsque la souris survole une compétence
    console.log(`La souris survole la compétence ${skill.name}`);
  }

  // Déclaration de la méthode onMouseOut
  onMouseOut(skill: Skill): void {
    // Logique à exécuter lorsque la souris quitte une compétence
    console.log(`La souris quitte la compétence ${skill.name}`);
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
      this.msgList.push(this.newPhone.trim()); 
      this.newMsg = ''; 
    }
  }

  addDetails(array: number[]) {
    array.push(1);
  }

  deleteDetails(array: number[], index: number) {
    this.details.splice(index, 1);
  }

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

 

  ngOnInit(): void {
    this.editor = new Editor();
  
    // Initialisation du FormGroup avec dev_id à null initialement
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
      dev_id: [null, Validators.required]  // Initialisation à null
    });
  
    // Souscription aux paramètres de route pour obtenir l'ID du développeur
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id']; 
      console.log('ID du développeur:', id);
      this.devId = id; // Stockage de l'ID du développeur dans une variable de classe
  
      // Appel de l'API pour récupérer les détails du développeur
      this.getDeveloperDetails(id).subscribe((developerDetails) => {
        console.log('Détails du développeur:', developerDetails);
        this.dev = developerDetails; 
  
        // Mise à jour de dev_id dans le formulaire avec l'ID correct du développeur
        this.form.controls['dev_id'].setValue(this.dev.dev.id); // Assurez-vous que dev_id est correctement mis à jour
      });
    });
  }
  
  
  ajouterMsgdev(): void {
    console.log('Tentative de soumission du formulaire');
    if (this.form.valid) {
      const url = 'http://127.0.0.1:8000/api/contactdev';
      this.http.post<any>(url, this.form.value).subscribe({
        next: (response: any) => {
          console.log('Réponse de l\'API', response);
          this.messageEnvoye = true;
          this.messageErreur = '';
          // Attendre 2 secondes avant de rafraîchir la page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (error: any) => {
          console.error('Erreur de l\'API', error);
          this.messageErreur = 'Une erreur s\'est produite lors de l\'envoi du message.';
          this.messageEnvoye = false;
        }
      });
    } else {
      console.log('Le formulaire n\'est pas valide.');
      console.log(this.form.errors);
    }
  }
  
  

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getDeveloperDetails(id: number): Observable<any> {
    const apiUrl = `http://localhost:8000/api/devs/${id}/cvpublic`;
    return this.http.get(apiUrl).pipe(
      map((data: any) => {
        // Traitement de l'image du développeur
        data.dev.img = `http://localhost:8000/storage/photos/${data.dev.photo}`;
        // Assurez-vous que experiences est correctement attaché à data.dev
        data.dev.experiences = data.experiences;
        data.dev.educations = data.educations; 
        
        if (data.skills) {
          data.skills.forEach((skill: any) => {
            // Correction ici: enlever le préfixe 'public/' du chemin
            const imagePath = skill.image.replace('public/', '');
            skill.image = `http://localhost:8000/storage/${imagePath}`;
          });
          // Filtres pour compétences principales et secondaires
          this.mainSkills = data.skills.filter((skill: any) => skill.pivot.isprincipal);
          this.otherSkills = data.skills.filter((skill: any) => !skill.pivot.isprincipal);
        }
        return data;
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des détails du développeur:', error);
        throw error;
      })
    );
  }
  
  
  
  
  
  
  
  
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private fb: FormBuilder, private http: HttpClient) {}



 

  

  toggle(): void {
    this.estActif = !this.estActif;
    this.boutonTexte = this.estActif ? "ON":"OFF";
}

}
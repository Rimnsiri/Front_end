import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public details = [];
  boutonTexte = "OFF";
  estActif = false;
  public routes = routes;
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

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  constructor(private router: Router, private route: ActivatedRoute) {} // Inject ActivatedRoute here

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.params.subscribe(params => {
      const id = params['id']; // Récupérer l'ID depuis l'URL
      console.log('ID du développeur:', id);
      // Vous pouvez utiliser cet ID pour charger les détails du développeur
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngsubmit(): void {
    if (this.form.valid) {
      const recaptchaValue = this.form.get('recaptcha')?.value;
      if (recaptchaValue) {
        this.router.navigate([routes.freelancer_projects_proposals]);
      } else {
        console.log('Le reCAPTCHA est invalide. Veuillez vérifier.');
      }
    } else {
      console.log('Le formulaire est invalide. Veuillez vérifier.');
    }
  }

  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }

  navigation2() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }

  mainSkills: any[] = [
    { name: 'java', image: 'assets/img/java.png', experience: 3 },
    { name: 'flutter', image: 'assets/img/icons8-flutter-48.png', experience: 2 },
    { name: 'Figma', image: 'assets/img/figma.png', experience: 5 },
  ];

  otherSkills: any[] = [
    { name: 'Html', image: 'assets/img/html.logo.png', experience: 3 },
    { name: 'Javascript', image: 'assets/img/jslog.png', experience: 4 },
    { name: 'CSS3', image: 'assets/img/css.png', experience: 5 },
    { name: 'dart', image: 'assets/img/dart.png', experience: 2 },
    { name: 'Power Bi', image: 'assets/img/powerbi.png', experience: 4 },
  ];

  showAllSkills = false;

  toggle(): void {
    this.estActif = !this.estActif;
    this.boutonTexte = this.estActif ? "ON" : "OFF";
  }
}

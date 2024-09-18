import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Education {
  diplome: string;
  école: string;
  startdate: string;
  enddate: string;
  description: string;
}

interface Skill {
  newSkillName: string;
  newSkillNbrMonth: number;
  newSkillIsPrincipal: boolean;
}

interface Experience {
  title: string;
  companyName: string;
  startdate: string;
  enddate: string;
  description: string;
}

interface CVData {
  title: string;
  description: string;
  dev_id: number;
  tjm: number;
  niveau: string;
  french_level:string;
  english_level:string;
  ispublic: boolean;
  educations: Education[];
  skills: Skill[];
  experiences: Experience[];
}

@Component({
  selector: 'app-project-proposals',
  templateUrl: './project-proposals.component.html',
  styleUrls: ['./project-proposals.component.scss']
})
export class ProjectProposalsComponent implements OnInit {
  cvForm!: FormGroup;
  skillsList: any[] = [];
  showAlert = false;
  alertMessage = '';
  isError = false;

  constructor(private fb: FormBuilder, private http: HttpClient ,private router: Router) {}

  ngOnInit() {
    this.cvForm = this.fb.group({
      title: ['', Validators.required],
      tjm: ['', Validators.required],
      niveau: ['', Validators.required],
      french_level:['',Validators.required],
      english_level:['' , Validators.required],
      description: [''],
      educations: this.fb.array([]),
      skills: this.fb.array([]),
      experiences: this.fb.array([])
    });
    this.loadSkills();
  }

  loadSkills() {
    this.http.get<any[]>('http://localhost:8000/api/skills').subscribe(
      data => this.skillsList = data,
      error => console.error('Could not load skills.', error)
    );
  }

  submitCV() {
    const formData: CVData = this.cvForm.value;
    const devId = localStorage.getItem('dev_id');
    console.log('Dev ID:', devId);
  
    if (devId !== null) {
      formData.dev_id = parseInt(devId);
      formData.ispublic = true;

        this.http.post('http://127.0.0.1:8000/api/cvs', formData).subscribe(
            response => {
                this.showAlert = true;
                this.isError = false;
                this.alertMessage = 'CV créé avec succès!';
                setTimeout(() => {
                    this.showAlert = false;
                    this.router.navigate(['/freelancer/dashboards']);
                }, 3000); // Alert shown for 3 seconds
            },
            error => {
                this.showAlert = true;
                this.isError = true;
                this.alertMessage = 'Échec de la création du CV: ' + error.error.message;
                setTimeout(() => {
                    this.showAlert = false;
                }, 3000); // Alert shown for 3 seconds
            }
        );
    } else {
        this.showAlert = true;
        this.isError = true;
        this.alertMessage = 'Échec de la création du CV: dev_id non trouvé dans le localStorage';
        setTimeout(() => {
            this.showAlert = false;
        }, 3000); // Alert shown for 3 seconds
    }
}
  

  



  get educations(): FormArray {
    return this.cvForm.get('educations') as FormArray;
  }

  addEducation() {
    const educationGroup = this.fb.group({
      diplome: ['', Validators.required],
      école: ['', Validators.required], // 'école' a été changé à 'ecole' pour correspondre au formControlName
      startdate: ['', Validators.required],
      enddate: [''],
      description: ['']
    });
    this.educations.push(educationGroup);
  }
  
  removeEducation(index: number) {
    this.educations.removeAt(index);
  }
  

  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  addSkills() {
    const skillGroup = this.fb.group({
      newSkillName: ['', Validators.required],
      newSkillNbrMonth: ['', Validators.required],
      newSkillIsPrincipal: [false]
    });
    this.skills.push(skillGroup);
  }
  
  removeSkills(index: number) {
    this.skills.removeAt(index);
  }
  
  
  get experiences(): FormArray {
    return this.cvForm.get('experiences') as FormArray;
  }

  addExperience() {
    const experienceGroup = this.fb.group({
      title: ['', Validators.required],
      entreprisename: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: [''],
      description: ['']
    });
    this.experiences.push(experienceGroup);
  }
  
  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }
  
}

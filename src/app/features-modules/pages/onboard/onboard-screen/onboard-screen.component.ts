import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
interface data {
  value: string;
}
@Component({
  selector: 'app-onboard-screen',
  templateUrl: './onboard-screen.component.html',
  styleUrls: ['./onboard-screen.component.scss'],
})
export class OnboardScreenComponent {
  profileForm: FormGroup;
  public selectedFieldSet = [0];
  public routes = routes;
  public displayBlock = false;
  public displayNone = false;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public experience: number[] = [];
  public language: number[] = [];
  public datas : boolean[] = [true]
  public isCheckboxChecked = true;

  errorMessage = '';


  constructor(private datePipe: DatePipe, private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.profileForm = this.fb.group({
      name: '',
      firstname: '',
      presentation: '',
      email: '',
      phone: '',
      address: '',
      photo: null
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.profileForm.get('photo')?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.profileForm.value).forEach(([key, value]: [string, any]) => {
      formData.append(key, value);
    });
  
    // Récupérez comptedev_id stocké et ajoutez-le à formData
    const comptedevId = localStorage.getItem('comptedev_id');
    console.log('comptedevId récupéré:', comptedevId); // Log pour débogage
  
    if (comptedevId) {
      formData.append('comptedev_id', comptedevId);
    } else {
      console.error('comptedev_id est manquant');
      this.errorMessage = 'tu ne crées pas de compte ';
    }
  
    this.http.post('http://127.0.0.1:8000/api/profile', formData).subscribe(
      response => {
        console.log('Profil créé avec succès', response);
        const dev_id = (response as { dev_id?: number }).dev_id; // Correcte assertion de type
        if (dev_id) {
          localStorage.setItem('dev_id', dev_id.toString());
          console.log('Nouveau dev_id:', dev_id);
        } else {
          console.error('dev_id est manquant dans la réponse');
        }
        // Gestion de la réussite, par exemple, 
        setTimeout(() => {
          this.router.navigate(['/freelancer/dashboards']);
        }, 1000);
      },
      error => {
        console.error('Erreur lors de la création du profil', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'création de profil non effectuée';
        }
      }
    );
  }
  
  
  block() {
    this.displayBlock = !this.displayBlock;
  }
  none() {
    this.displayNone = !this.displayNone;
  }
  addSkills() {
    this.skills.push(1);
    console.log('hii');
  }
  removeSkills(index: number) {
    this.skills.splice(index, 1);
  }

  addEducation() {
    this.education.push(1);
  }
  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  addCertification() {
    this.certification.push(1);
  }
  removeCertification(index: number) {
    this.certification.splice(index, 1);
  }

  addExperience() {
    this.experience.push(1);
  }
  removeExperience(index: number) {
    this.experience.splice(index, 1);
  }
  
  addLanguage() {
    this.language.push(1);
  }
  removeLanguage(index: number) {
    this.language.splice(index, 1);
  }


  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  selectedList1: data[] = [
    { value: 'Choose Level' },
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Hourly' },
  ];
  selectedList2: data[] = [
    { value: 'Choose Level' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: "Bachelor's degree" },
    { value: "Master's Degree" },
  ];
  selectedList4: data[] = [
    { value: 'Select' },
    { value: "Certification" },
    { value: "Award" },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];
  selectedList6: data[] = [
    { value: 'Choose Level' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { value: 'US' },
    { value: 'UK' },
    { value: 'India' },
  ];
  selectedList8: data[] = [
    { value: 'Select' },
    { value: 'US' },
    { value: 'UK' },
    { value: 'India' },
  ];
  showTimePicker: Array<string> = [];

  public hoursArray1 = [0];
  public hoursArray2 = [0];
  public hoursArray3 = [0];
  public hoursArray4 = [0];
  public hoursArray5 = [0];
  public hoursArray6 = [0];
  public hoursArray7 = [0];

  startTime1 = new Date();
  startTime2 = new Date();
  startTime3 = new Date();
  startTime4 = new Date();
  startTime5 = new Date();
  startTime6 = new Date();
  startTime7 = new Date();
  endTime1 = new Date();
  endTime2 = new Date();
  endTime3 = new Date();
  endTime4 = new Date();
  endTime5 = new Date();
  endTime6 = new Date();
  endTime7 = new Date();
  


  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }
}

import { DatePipe } from '@angular/common';
import { Component ,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface data {
  value: string;
}
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  form: FormGroup;
  comptedevId: number | null = null;
  public routes = routes;
  imageUrl = '';

  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public experience: number[] = [];
  public language: number[] = [];

  public datas : boolean[] = [true]
  public isCheckboxChecked = true;



  
  

  
  


  
  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      presentation: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }
  navigation() {
    this.router.navigate([routes.freelancerprofile])
  }

  

 

  ngOnInit(): void {
    // Utiliser 'dev_id' pour identifier le développeur spécifique
    const devIdStr = localStorage.getItem('dev_id');
    if (devIdStr) {
      this.comptedevId = parseInt(devIdStr, 10);
      this.loadDevProfile();
    } else {
      console.log('ID de développeur non trouvé dans le stockage local.');
      this.router.navigate(['/auth/login']);
    }
  }
  

  loadDevProfile(): void {
    this.http.get(`http://127.0.0.1:8000/api/devs/${this.comptedevId}`).subscribe(
      (data: any) => {
        this.form.patchValue({
          name: data.name,
          firstname: data.firstname,
          presentation: data.presentation,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
        if (data.photo) {
          this.imageUrl = `http://127.0.0.1:8000/storage/photos/${data.photo}`;
      }
      },
      (error: any) => {
        console.error('Error loading developer data', error);
      }
    );
  }
  

  updateProfile(): void {
    this.http.put(`http://127.0.0.1:8000/api/devs/${this.comptedevId}`, this.form.value).subscribe({
      next: () => {
        alert('Profile Updated Successfully!');
        this.router.navigate(['/freelancer/dashboards']);
      },
      error: (err) => {
        console.error('Error updating profile', err);
      }
    });
  }

}

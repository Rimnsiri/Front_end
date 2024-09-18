import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule} from 'ng-recaptcha';

import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
  ],
  exports: [
    ContactComponent
  ]
})
export class ContactModule { }

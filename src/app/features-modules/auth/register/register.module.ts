import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule ,FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class RegisterModule { }

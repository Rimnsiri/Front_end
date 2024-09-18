import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginemplyeRoutingModule } from './loginemplye-routing.module';
import { LoginemplyeComponent } from './loginemplye.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginemplyeComponent,
  ],
  imports: [
    CommonModule,
    LoginemplyeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class LoginemplyeModule { }

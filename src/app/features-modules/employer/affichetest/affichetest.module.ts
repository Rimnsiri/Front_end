import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { AffichetestRoutingModule } from './affichetest-routing.module';
import { AffichetestComponent } from './affichetest.component';

@NgModule({
  declarations: [
    AffichetestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, 
    AffichetestRoutingModule
  ]
})
export class AffichetestModule { }

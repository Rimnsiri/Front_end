import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, 
    TestRoutingModule
  ]
})
export class TestModule { }

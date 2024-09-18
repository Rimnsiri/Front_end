import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HisRoutingModule } from './his-routing.module';
import { HisComponent } from './his.component';


@NgModule({
  declarations: [
    HisComponent
  ],
  imports: [
    CommonModule,
    HisRoutingModule
  ]
})
export class HisModule { }

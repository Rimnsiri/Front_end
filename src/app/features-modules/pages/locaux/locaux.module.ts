import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocauxRoutingModule } from './locaux-routing.module';
import { LocauxComponent } from './locaux.component';


@NgModule({
  declarations: [
    LocauxComponent
  ],
  imports: [
    CommonModule,
    LocauxRoutingModule
  ]
})
export class LocauxModule { }

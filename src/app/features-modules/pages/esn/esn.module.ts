import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsnRoutingModule } from './esn-routing.module';
import { EsnComponent } from './esn.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    EsnComponent
  ],
  imports: [
    CommonModule,
    EsnRoutingModule,
    CarouselModule,
    SharedModule,
    SlickCarouselModule,
  ]
})
export class EsnModule { }

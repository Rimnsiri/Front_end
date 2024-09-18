import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    CarouselModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class StartModule { }

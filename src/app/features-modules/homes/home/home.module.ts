import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    SharedModule,
     NgSelectModule,
     NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class HomeModule { }

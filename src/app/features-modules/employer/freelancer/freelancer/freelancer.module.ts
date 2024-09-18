import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerComponent } from './freelancer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FreelancerComponent
  ],
  imports: [
   
    FormsModule,
    NgSelectModule,
    CommonModule,
    FreelancerRoutingModule,
    NgxSliderModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ]
  
})
export class FreelancerModule { 
  
}

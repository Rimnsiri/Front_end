import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecaptchaModule,RecaptchaFormsModule} from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    CarouselModule,
    SharedModule,
    RecaptchaModule,
    HttpClientModule,
    RecaptchaFormsModule,
  ]
})
export class AboutUsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperDetailsRoutingModule } from './developer-details-routing.module';
import { DeveloperDetailsComponent } from './developer-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    DeveloperDetailsComponent
  ],
  imports: [
    CommonModule,
    DeveloperDetailsRoutingModule,
    SharedModule,
    RecaptchaModule
  ]
})
export class DeveloperDetailsModule { }

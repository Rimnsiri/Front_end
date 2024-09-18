import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesModulesRoutingModule } from './features-modules-routing.module';
import { FeaturesModulesComponent } from './features-modules.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
 import { LoaderComponent } from './common/loader/loader.component';
import { ContactComponent } from './contact/contact.component';




@NgModule({
  declarations: [
    FeaturesModulesComponent,
    HeaderComponent,
    FooterComponent,
     LoaderComponent,
     ContactComponent
  
  
  ],
  imports: [
    CommonModule,
    FeaturesModulesRoutingModule,
  ],

})
export class FeaturesModulesModule { }

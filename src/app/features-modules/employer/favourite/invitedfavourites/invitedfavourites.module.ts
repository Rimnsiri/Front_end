import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitedfavouritesRoutingModule } from './invitedfavourites-routing.module';
import { InvitedfavouritesComponent } from './invitedfavourites.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    InvitedfavouritesComponent
  ],
  imports: [
    CommonModule,
    InvitedfavouritesRoutingModule,
    FormsModule,
    HttpClientModule

  ]
})
export class InvitedfavouritesModule { }

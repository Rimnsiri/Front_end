import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AffichetestComponent } from './affichetest.component';

const routes: Routes = [{ path: '', component: AffichetestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffichetestRoutingModule { }

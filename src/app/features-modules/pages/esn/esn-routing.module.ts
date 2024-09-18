import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsnComponent } from './esn.component';

const routes: Routes = [{ path: '', component: EsnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsnRoutingModule { }

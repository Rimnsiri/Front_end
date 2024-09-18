import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HisComponent } from './his.component';

const routes: Routes = [{ path: '', component: HisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HisRoutingModule { }

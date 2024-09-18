import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocauxComponent } from './locaux.component';

const routes: Routes = [{ path: '', component: LocauxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocauxRoutingModule { }

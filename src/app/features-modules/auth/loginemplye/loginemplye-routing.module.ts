import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginemplyeComponent } from './loginemplye.component';

const routes: Routes = [{ path: '', component: LoginemplyeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginemplyeRoutingModule { }

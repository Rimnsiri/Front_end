import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'locaux',
        loadChildren: () => import('./locaux/locaux.module').then((m) => m.LocauxModule),
      },
      {
        path: 'start',
        loadChildren: () => import('./start/start.module').then((m) => m.StartModule),
      },
      {
        path: 'esn',
        loadChildren: () => import('./esn/esn.module').then((m) => m.EsnModule),
      },
      
      {
        path: 'his',
        loadChildren: () => import('./his/his.module').then((m) => m.HisModule),
      },
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'otp',
        loadChildren: () => import('./otp/otp.module').then((m) => m.OtpModule),
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('./starter/starter.module').then((m) => m.StarterModule),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'onboard-screen',
        loadChildren: () =>
          import('./onboard/onboard-screen/onboard-screen.module').then(
            (m) => m.OnboardScreenModule
          ),
      },
      {
        path: 'onboard-employer',
        loadChildren: () =>
          import('./onboard/onboard-employer/onboard-employer.module').then(
            (m) => m.OnboardEmployerModule
          ),
      },
      
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ErrorfoundComponent } from '../auth/errorfound/errorfound.component';
import { FeaturesModulesComponent } from './features-modules.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  { 
    path: '', 
    component: FeaturesModulesComponent,
    children: [
      { path: 'contact', component: ContactComponent },
      { 
        
        path: 'home', 
        loadChildren: () => import('./homes/home/home.module').then((m) => m.HomeModule) ,
        
      },
     
      { 
        path: 'employer', 
        // canActivate: [EmployerGuard],
        loadChildren: () => import('./employer/employer.module').then((m) => m.EmployerModule) 
        
      },
      { 
        path: 'freelancer', 
        // canActivate: [FreelancerGuard],
        loadChildren: () => import('./freelancer/freelancer.module').then((m) => m.FreelancerModule) 
      },
      { 
        path: 'pages', 
        // canActivate: [PageGuard],
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) 
      },
     
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    
    ],
  },
  { 
    path: 'admin',
    // canActivate: [AdminGuard], 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path: 'admin/chats', // Chemin pour accéder à vos fonctionnalités de chat
    loadChildren: () => import('./admin/chats/chats.module').then(m => m.ChatsModule)
  },
 
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesModulesRoutingModule { }

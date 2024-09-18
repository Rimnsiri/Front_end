import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';





const routes: Routes = [
  {
    path: '',
    component: EmployerComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    

    
      {
        path: 'affichetest/:id', 
        loadChildren: () =>
          import('./affichetest/affichetest.module').then((m) => m.AffichetestModule),
      },
    
    
      {
        path: 'test',
        loadChildren: () =>
          import('./test/test.module').then((m) => m.TestModule),
      },
     
      
        {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
     
      {
        path: 'developer',
        loadChildren: () =>
          import('./freelancer/freelancer/freelancer.module').then(
            (m) => m.FreelancerModule
          ),
      },
      {
        path: 'developer-list',
        loadChildren: () =>
          import('./freelancer/freelancer-list/freelancer-list.module').then(
            (m) => m.FreelancerListModule
          ),
      },
     
    
     
    
      {
        path: 'notification',
        loadChildren: () =>
          import('./notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: 'developer-details/:id',
        loadChildren: () => import('./developer-details/developer-details.module').then((m) => m.DeveloperDetailsModule)
      },
      
      {
        path: 'chats',
        loadChildren: () =>
          import('./chats/chats.module').then((m) => m.ChatsModule),
      },
      
      {
        path: 'freelancer-profile',
        loadChildren: () =>
          import('./freelancer-profile/freelancer-profile.module').then(
            (m) => m.FreelancerProfileModule
          ),
      },
       
      {
        path: 'review',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),
      },
      { 
        path: 'change-password', 
        loadChildren: () => import('./setting/change-password/change-password.module').then(m => m.ChangePasswordModule) 
      }, 
      { 
        path: 'delete-account', 
        loadChildren: () => import('./setting/delete-account/delete-account.module').then(m => m.DeleteAccountModule) 
      },
      { 
        path: 'basic-settings', 
        loadChildren: () => import('./setting/basic-settings/basic-settings.module').then(m => m.BasicSettingsModule) 
      }, 
      { path: 'markedfavourites', loadChildren: () => import('./favourite/markedfavourites/markedfavourites.module').then(m => m.MarkedfavouritesModule) },
      { path: 'favourites-list', loadChildren: () => import('./favourite/favourites-list/favourites-list.module').then(m => m.FavouritesListModule) },
      { path: 'invitedfavourites', loadChildren: () => import('./favourite/invitedfavourites/invitedfavourites.module').then(m => m.InvitedfavouritesModule) },
   
      
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}

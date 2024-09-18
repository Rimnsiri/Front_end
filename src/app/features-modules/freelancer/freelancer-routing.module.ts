import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerComponent } from './freelancer.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancerComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
     
      {
        path: 'developer-profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./settings/profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./settings/delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),
      },
     
    
      {
        path: 'reviews',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),
      },
      
      {
        path: 'favourites',
        loadChildren: () =>
          import(
            './favourites/freelancer-favourites/freelancer-favourites.module'
          ).then((m) => m.FreelancerFavouritesModule),
      },
      {
        path: 'invitations',
        loadChildren: () =>
          import(
            './favourites/freelancer-invitations/freelancer-invitations.module'
          ).then((m) => m.FreelancerInvitationsModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./project/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
     
      {
        path: 'project-proposals',
        loadChildren: () =>
          import('./project/project-proposals/project-proposals.module').then(
            (m) => m.ProjectProposalsModule
          ),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('./chats/chats.module').then((m) => m.ChatsModule),
      },
    
    
      {
        path: 'statement',
        loadChildren: () =>
          import('./statement/statement.module').then((m) => m.StatementModule),
      },
     
      {
        path: 'change-password',
        loadChildren: () =>
          import('./settings/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
     
    
  
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerRoutingModule {}

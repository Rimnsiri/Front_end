import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectProposalsRoutingModule } from './project-proposals-routing.module';
import { ProjectProposalsComponent } from './project-proposals.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectProposalsComponent
  ],
  imports: [
    CommonModule,
    ProjectProposalsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProjectProposalsModule { }

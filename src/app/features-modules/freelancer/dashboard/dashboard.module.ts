import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class DashboardModule { }

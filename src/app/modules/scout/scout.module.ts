import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoutRoutingModule } from './scout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPersonalDetailsComponent } from './edit-personal-details/edit-personal-details.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DashboardComponent,
    EditPersonalDetailsComponent
  ],
  imports: [
    CommonModule,
    ScoutRoutingModule,
    TranslateModule
  ]
})
export class ScoutModule { }

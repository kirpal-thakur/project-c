import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';


@NgModule({
  declarations: [
    SuccessComponent,
    CancelComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }

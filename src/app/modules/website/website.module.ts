import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmPasswordComponent } from './SetPassword/confirmPassword.component';
import { ValidateUserComponent } from './validateUser/validateUser.component';

@NgModule({
  declarations: [
    IndexComponent,
    ConfirmPasswordComponent,
    ValidateUserComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    TranslateModule // Make sure to include TranslateModule here if using in this module

  ]
})
export class WebsiteModule { }

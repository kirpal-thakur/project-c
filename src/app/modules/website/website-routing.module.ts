import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConfirmPasswordComponent } from './SetPassword/confirmPassword.component'
import { ValidateUserComponent } from './validateUser/validateUser.component';

const routes: Routes = [
  {
    path:"",
    component:IndexComponent
  },
  // { path: 'Index', component: ConfirmPasswordComponent, pathMatch: 'full' },
  { path: '', component: ConfirmPasswordComponent },
  { path: 'validate-user', component: ValidateUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }

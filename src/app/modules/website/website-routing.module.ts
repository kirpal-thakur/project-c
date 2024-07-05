import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConfirmPasswordComponent } from './SetPassword/confirmPassword.component'

const routes: Routes = [
  {
    path:"",
    component:IndexComponent
  },
  // { path: 'Index', component: ConfirmPasswordComponent, pathMatch: 'full' },
  { path: '', component: ConfirmPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }

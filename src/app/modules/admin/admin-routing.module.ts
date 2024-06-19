import { NgModule, TemplateRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { InboxComponent } from './inbox/inbox.component';
import { TemplatesComponent } from './templates/templates.component';
import { MarketingComponent } from './marketing/marketing.component';
import { WebsiteComponent } from './website/website.component';
import { SettingComponent } from './setting/setting.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from '../../services/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  {
    path:"",
    component: IndexComponent,
    children: [
      {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
       { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {path: 'Users', component: UsersComponent},
      {path: 'Inbox', component: InboxComponent},
      {path: 'Templates', component: TemplatesComponent},
      {path: 'Marketing', component: MarketingComponent},
      {path: 'Website', component: WebsiteComponent},
      {path: 'Setting', component: SettingComponent},
      {path: 'User-detail', component: UserDetailComponent},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

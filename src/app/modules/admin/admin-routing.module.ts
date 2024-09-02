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
import { GalleryDetailComponent } from './user-detail/gallery/gallery.detail.component';

const routes: Routes = [
  {
    path:"",
    component: IndexComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {path: 'users', component: UsersComponent},
      {path: 'inbox', component: InboxComponent},
      {path: 'templates', component: TemplatesComponent},
      {path: 'marketing', component: MarketingComponent},
      {path: 'website', component: WebsiteComponent},
      {path: 'setting', component: SettingComponent},
      {path: 'user-detail', component: UserDetailComponent},
      { path: 'gallery-detail', component: GalleryDetailComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

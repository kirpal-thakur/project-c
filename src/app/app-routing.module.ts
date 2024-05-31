import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo : '/Dashboard',
    pathMatch : 'full'
  },

  {path : 'Dashboard', 
  loadChildren:()=> import('./modules/dashboard/dashboard.module').then(m=> m.DashboardModule)},
  {path : 'Users', 
  loadChildren:()=> import('./modules/users/users.module').then(m=> m.UsersModule)},
  {path : 'Inbox', 
  loadChildren:()=> import('./modules/inbox/inbox.module').then(m=> m.InboxModule)},
  {path : 'Setting', 
  loadChildren:()=> import('./modules/setting/setting.module').then(m=> m.SettingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

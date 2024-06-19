import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Index',
    pathMatch: 'full',
  },
  {
    path: 'Index',
    loadChildren: () =>
      import('./modules/website/website.module').then(
        (m) => m.WebsiteModule
      ),
  },
  {
    path: 'Admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

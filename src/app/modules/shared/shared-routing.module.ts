import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../talent/index/index.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'view',
    component: IndexComponent,
    children: [
      { path: 'player/:id', component: ViewProfileComponent},
      { path: 'scout/:id', component: ViewProfileComponent },
      { path: 'club/:id', component: ViewProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

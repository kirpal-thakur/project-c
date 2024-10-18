import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../services/auth.guard';
import { FavoritesComponent } from './favorites/favorites.component';
import { MembershipComponent } from './membership/membership.component';
import { ExploreComponent } from './explore/explore.component';
import { ChatComponent } from './chat/chat.component';
import { PlanComponent } from './plan/plan.component';
import { CountriesComponent } from './countries/countries.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'favorites', component: FavoritesComponent},
      { path: 'membership', component: MembershipComponent},
      { path: 'explore', component: ExploreComponent},
      { path: 'chat', component: ChatComponent},
      { path: 'plans', component: PlanComponent},
      { path: 'countries', component: CountriesComponent},
      { path: 'setting', component: SettingComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentRoutingModule } from './talent-routing.module';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { NgxEditorModule } from 'ngx-editor';
import { ProfileTabComponent } from './tabs/profile-tab/profile-tab.component';
import { PerformanceTabComponent } from './tabs/performance-tab/performance-tab.component';
import { TransfersTabComponent } from './tabs/transfers-tab/transfers-tab.component';
import { GalleryTabComponent } from './tabs/gallery-tab/gallery-tab.component';
import { UploadPopupComponent } from './upload-popup/upload-popup.component';
import { EditPersonalDetailsComponent } from './edit-personal-details/edit-personal-details.component';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { MembershipComponent } from './membership/membership.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { PerformanceAnalysisTabComponent } from './tabs/performance-analysis-tab/performance-analysis-tab.component';
import { ExploreComponent } from './explore/explore.component';
import { PlanComponent } from './plan/plan.component';
import { CountriesComponent } from './countries/countries.component';
import { ChatComponent } from './chat/chat.component';
import { ViewMembershipPopupComponent } from './view-membership-popup/view-membership-popup.component';
import { PaymentsPopupComponent } from './payments-popup/payments-popup.component';
import { EditMembershipProfileComponent } from './edit-membership-profile/edit-membership-profile.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditGeneralDetailsComponent } from './edit-general-details/edit-general-details.component';

@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FavoritesComponent,
    ProfileTabComponent,
    PerformanceTabComponent,
    TransfersTabComponent,
    GalleryTabComponent,
    UploadPopupComponent,
    EditPersonalDetailsComponent,
    MessagePopupComponent,
    MembershipComponent,
    PlayerProfileComponent,
    PerformanceAnalysisTabComponent,
    ExploreComponent,
    PlanComponent,
    CountriesComponent,
    ViewMembershipPopupComponent,
    PaymentsPopupComponent,
    EditMembershipProfileComponent,
    EditPlanComponent,
    ResetPasswordComponent,
    EditGeneralDetailsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    TranslateModule ,
    TalentRoutingModule,  // This includes RouterModule
    MatPaginator,    
    TranslateModule ,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginator,
    NgxEditorModule,
    
  ]
})
export class TalentModule { }

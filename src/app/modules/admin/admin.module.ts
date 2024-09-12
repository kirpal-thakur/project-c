import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { InboxComponent } from './inbox/inbox.component';
import { TemplatesComponent } from './templates/templates.component';
import { MarketingComponent } from './marketing/marketing.component';
import { WebsiteComponent } from './website/website.component';
import { SettingComponent } from './setting/setting.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { EmptyTableComponent } from './empty-table/emplty-table.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { ClickOutsideDirective } from './marketing/click-outside.directive';
import { RouterModule } from '@angular/router';
import { UserDetailPopupComponent } from './users/user-detail-popup/user-detail-popup.component';
import { GalleryTabComponent } from './tabs/gallery-tab/gallery-tab.component';
import { TransfersTabComponent } from './tabs/transfers-tab/transfers-tab.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { PerformanceTabComponent } from './tabs/performance-tab/performance-tab.component';
import { FavoritesTabComponent } from './tabs/favorites-tab/favorites-tab.component';
import { PurchaseTabComponent } from './tabs/purchase-tab/purchase-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoupenCodePopupComponent } from './website/coupen/coupenCode-popup.component';
import { AdvertisingPopupComponent } from './website/advertising/advertising-popup.component';
import { NgxEditorModule  } from 'ngx-editor';
import { ChatTabComponent } from './tabs/chat-tab/chat-tab.component';
import { TeamMemberDetailComponent } from './setting/teamMember/teamMember.detail.component';
import { InboxPopupComponent } from './inbox/inbox-popup/inbox-popup.component';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TemplatePopupComponent } from './templates/template-popup/template-popup.component';
import { MarketingPopupComponent } from './marketing/marketing-popup/marketing-popup.component';
import { FilterPopupComponrnt } from './filter-popup/filter-popup.component';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { ScoutDetailComponent } from './scout-detail/scout-detail.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ProfileTabComponent } from './tabs/profile-tab/profile-tab.component';
import { UploadPopupComponent } from './upload-popup/upload-popup.component';

  
@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    UsersComponent,
    InboxComponent,
    TemplatesComponent,
    MarketingComponent,
    WebsiteComponent,
    SettingComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    EmptyTableComponent,
    PlayerDetailComponent,
    ClickOutsideDirective,
    UserDetailPopupComponent,
    GalleryTabComponent,
    TransfersTabComponent,
    FavoritesTabComponent,
    PurchaseTabComponent,
    PerformanceTabComponent,
    CoupenCodePopupComponent,
    AdvertisingPopupComponent,
    ChatTabComponent,
    TeamMemberDetailComponent,
    InboxPopupComponent,
    MarketingPopupComponent,
    TemplatePopupComponent,
    FilterPopupComponrnt,
    MessagePopupComponent,
    ScoutDetailComponent,
    ClubDetailComponent,
    ProfileTabComponent,
    UploadPopupComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    MatTabsModule ,
    MatTableModule,
    MatPaginator,
    NgxEditorModule
  ],
  providers: [UserService]
})
export class AdminModule { }

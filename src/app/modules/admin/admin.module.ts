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
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { ClickOutsideDirective } from './marketing/click-outside.directive';
import { RouterModule } from '@angular/router';
import { UserDetailPopupComponent } from './users/user-detail-popup/user-detail-popup.component';
import { GalleryDetailComponent } from './user-detail/gallery/gallery.detail.component';
import { TransfersDetailComponent } from './user-detail/transfers/transfers.detail.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { PerformanceDetailComponent } from './user-detail/performance/performance.detail.component';
import { FavoritesDetailComponent } from './user-detail/favriots/favorites.detail.component';
import { PurchaseDetailComponent } from './user-detail/purchase/purchase.detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoupenCodePopupComponent } from './website/coupen/coupenCode-popup.component';
import { AdvertisingPopupComponent } from './website/advertising/advertising-popup.component';
import { NgxEditorModule  } from 'ngx-editor';
import { ChatDetailComponent } from './user-detail/chat/chat.detail.component';
import { TeamMemberDetailComponent } from './setting/teamMember/teamMember.detail.component';
import { InboxPopupComponent } from './inbox/inbox-popup/inbox-popup.component';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TemplatePopupComponent } from './templates/template-popup/template-popup.component';
import { MarketingPopupComponent } from './marketing/marketing-popup/marketing-popup.component';
import { FilterPopupComponrnt } from './filter-popup/filter-popup.component';

  
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
    UserDetailComponent,
    ClickOutsideDirective,
    UserDetailPopupComponent,
    GalleryDetailComponent,
    TransfersDetailComponent,
    FavoritesDetailComponent,
    PurchaseDetailComponent,
    PerformanceDetailComponent,
    CoupenCodePopupComponent,
    AdvertisingPopupComponent,
    ChatDetailComponent,
    TeamMemberDetailComponent,
    InboxPopupComponent,
    MarketingPopupComponent,
    TemplatePopupComponent,
    FilterPopupComponrnt
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

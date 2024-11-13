import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { GalleryComponent } from './view-profile/tabs/gallery/gallery.component';
import { GeneralDetailsComponent } from './view-profile/tabs/general-details/general-details.component';
import { PerformanceDetailsComponent } from './view-profile/tabs/performance-details/performance-details.component';
import { PerformanceReportComponent } from './view-profile/tabs/performance-report/performance-report.component';
import { TransferDetailsComponent } from './view-profile/tabs/transfer-details/transfer-details.component';
import { TranslateModule } from '@ngx-translate/core';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxEditorModule } from 'ngx-editor';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CouponCodeAlertComponent } from './coupon-code-alert/coupon-code-alert.component';


@NgModule({
  declarations: [
    SuccessComponent,
    CancelComponent,
    ViewProfileComponent,
    GalleryComponent,
    GeneralDetailsComponent,
    PerformanceDetailsComponent,
    PerformanceReportComponent,
    TransferDetailsComponent,   
    MessagePopupComponent,
    IndexComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CouponCodeAlertComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule,
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
    MatPaginator,
    NgxEditorModule,    
  ]
})
export class SharedModule { }

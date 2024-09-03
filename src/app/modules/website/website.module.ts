import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { WebsiteRoutingModule } from './website-routing.module';
import { IndexComponent } from './index/index.component';
import { ConfirmPasswordComponent } from './SetPassword/confirmPassword.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FeatureComponent } from './feature/feature.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { ClubComponent } from './club/club.component';
import { CaComponent } from './ca/ca.component';
import { PricingComponent } from './pricing/pricing.component';
import { FaqComponent } from './faq/faq.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { CookieComponent } from './cookie/cookie.component';

// Import services
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';



@NgModule({
  declarations: [
    IndexComponent,
    ConfirmPasswordComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    FeatureComponent,
    NewsComponent,
    ContactComponent,
    ClubComponent,
    CaComponent,
    PricingComponent,
    FaqComponent,
    ImprintComponent,
    TermsComponent,
    PrivacyComponent,
    CookieComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    WebsiteRoutingModule,
    FormsModule,
    TranslateModule // Import TranslateModule here if using it in this module
  ],
  providers: [
    AuthService,
    ThemeService,
    // TranslateService is typically used as an injectable service and should not be listed here
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class WebsiteModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConfirmPasswordComponent } from './SetPassword/confirmPassword.component'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ClubComponent } from './club/club.component';
import { FeatureComponent } from './feature/feature.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { CaComponent } from './ca/ca.component';
import { FaqComponent } from './faq/faq.component';
import { ImprintComponent } from './imprint/imprint.component';
import { CookieComponent } from './cookie/cookie.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TalentComponent } from './talent/talent.component';


const routes: Routes = [
  {
    path:"", component:IndexComponent },
  // { path: 'Index', component: ConfirmPasswordComponent, pathMatch: 'full' },
  { path: '', component: ConfirmPasswordComponent },
  {path:'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'club', component: ClubComponent},
  {path: 'feature', component: FeatureComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'news', component: NewsComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'ca', component: CaComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'imprint', component:ImprintComponent},
  {path: 'cookie', component: CookieComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'talent', component:TalentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }

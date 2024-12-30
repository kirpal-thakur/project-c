import { Component } from '@angular/core';
import { WebPages } from '../../../services/webpages.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {
  pageData:any = [{
    banner_title:'',
    banner_desc:'',
    banner_btn_txt:'',
    club_nd_scout_section_title:'',
    club_nd_scout_section:[],
    feature_sctn_title:'',
    feature_sctn:[],
    pricing_sctn_title:'',
    pricing_tab:[],
  }];
  isActive1 = true; // Premium Plan
  isActive2 = true; // Multi-Country Plan
  isActive3 = true; // Multi-Country Plan

  activeAccordionIndex = 1;

  constructor( private webPages: WebPages){ }

  setActiveAccordion(index: number): void {
    this.activeAccordionIndex = index;
  }

  isActivePlan: { [key: number]: boolean } = {}; // Keeps track of toggle states for each pricing plan

  ngOnInit() {
    // Retrieve the states from local storage
    const savedState1 = localStorage.getItem('toggleState1');
    const savedState2 = localStorage.getItem('toggleState2');
    this.adVisible = [true, true, true, true, true, true, true];

    // Set isActive for each toggle based on the saved states or default to false
    this.isActive1 = savedState1 === 'true' ? true : false;
    this.isActive2 = savedState2 === 'true' ? true : false;
    this.isActive3 = savedState2 === 'true' ? true : false;

    this.webPages.languageId$.subscribe((data) => {
    this.getPageData(data)
  });

  }

  getPageData(languageId: any){
    this.webPages.getDynamicContentPage('clubs_and_scouts',languageId).subscribe((res) => {
      if(res.status){
          this.pageData = res.data.pageData;

          // Initialize toggle states for pricing plans with Monthly active (false)
          this.pageData.pricing_tab.forEach((_: any, index: number) => {
            this.isActivePlan[index] = false; // Default to "Monthly"
          });

        }
    });
  }

  togglePlan(index: number) {
    this.isActivePlan[index] = !this.isActivePlan[index];
  }

  toggle1() {
    this.isActive1 = !this.isActive1;
    // Save the new state to local storage
    localStorage.setItem('toggleState1', this.isActive1.toString());
  }

  toggle2() {
    this.isActive2 = !this.isActive2;
    // Save the new state to local storage
    localStorage.setItem('toggleState2', this.isActive2.toString());
  }

  toggle3() {
    this.isActive3 = !this.isActive3;
    // Save the new state to local storage
    localStorage.setItem('toggleState2', this.isActive3.toString());
  }

  premiumFeatures = [
    'The complete talent profile with all stages of his career and performance data.',
    'Export data in excel and pdf formats.',
    'Create your favorite list.',
    'Highlight your best photos and videos on your profile.',

  ];

  multiCountryFeatures = [
    'Present your profile to clubs and leagues in other countries.',
    'Higher chances to get hired globally.',
    'Build your global portfolio.'
  ];

  boosterFeatures = [
    'Present your profile to clubs and leagues in other countries.',
    'Higher chances to get hired globally.',
    'Build your global portfolio.'
  ];

  adVisible: boolean[] = [true, true, true, true, true, true, true]; // Array to manage ad visibility

  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }

}

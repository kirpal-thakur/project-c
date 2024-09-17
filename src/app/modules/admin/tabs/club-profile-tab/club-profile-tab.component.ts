import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-club-profile-tab',
  templateUrl: './club-profile-tab.component.html',
  styleUrl: './club-profile-tab.component.scss'
})
export class ClubProfileTabComponent {
  user:any = {}
  userNationalities:any = [];

  @Input() userData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData']) {
      if(changes['userData'].currentValue.user_nationalities){
        this.userNationalities = JSON.parse(this.userData.user_nationalities);
      }
    }
  }
}

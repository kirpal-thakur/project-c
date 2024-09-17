import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-scout-profile-tab',
  templateUrl: './scout-profile-tab.component.html',
  styleUrl: './scout-profile-tab.component.scss'
})
export class ScoutProfileTabComponent {

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

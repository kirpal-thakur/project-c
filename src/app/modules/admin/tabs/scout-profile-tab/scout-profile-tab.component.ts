import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scout-profile-tab',
  templateUrl: './scout-profile-tab.component.html',
  styleUrl: './scout-profile-tab.component.scss'
})
export class ScoutProfileTabComponent {

  user:any = {}
  userNationalities:any = [];

  @Input() userData: any;
}

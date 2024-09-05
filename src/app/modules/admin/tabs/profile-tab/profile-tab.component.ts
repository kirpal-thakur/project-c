import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss'
})
export class ProfileTabComponent {
  user:any = {}
  userNationalities:any = [];

  @Input() userData: any;

  ngOnInit(): void {
    console.log(this.userData)
  }

  calculateAge(age:any){
    return age;
  }
}

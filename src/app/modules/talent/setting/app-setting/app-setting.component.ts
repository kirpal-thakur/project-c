import { Component } from '@angular/core';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrl: './app-setting.component.scss'
})
export class AppSettingComponent {
  loggedInUser:any = localStorage.getItem('userData');
  
  constructor(){}

  ngOnInit(){
    this.loggedInUser = JSON.parse(this.loggedInUser);
  }


}

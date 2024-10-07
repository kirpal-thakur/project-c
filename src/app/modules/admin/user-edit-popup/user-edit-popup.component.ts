import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { UserDetailPopupComponent } from '../users/user-detail-popup/user-detail-popup.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-user-edit-popup',
  templateUrl: './user-edit-popup.component.html',
  styleUrl: './user-edit-popup.component.scss'
})

export class UserEditPopupComponent {

  data:any = '';
  role:any = "";
  idToUpdate:any = "";
  clubName:any = "";
  contact:any = "";
  website:any = "";
  address:any = "";
  zipcode:any = "";
  city:any = "";
  sm_x:any = "";
  sm_facebook:any = "";
  sm_instagram:any = "";
  sm_tiktok:any = "";
  sm_youtube:any = "";
  sm_vimeo:any = "";
  selectedCountry:any = "";
  countriesListing:any = [];
  positionsListing:any = [];

  firstName:any = "";
  lastName:any = "";
  designation:any = "";
  companyName:any = "";
  playerInfoType: any = "";

  dob:any = "";
  sinceInTeam:any = "";
  foot:any = "";
  birthPlace:any = "";
  contractUntil:any = "";
  speed:any = "";
  height:any = "";
  otherPosition:any = "";
  playerClubsListing:any = [];
  playerClub: any = "";
  footListing:any = ['Left', 'Right', 'Both'];

  constructor(private userService: UserService, public dialogRef : MatDialogRef<UserDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public request: any) {
      this.data = request.data;
      this.role = request.role;
      if(this.role == 'player'){
        this.playerInfoType = request.type
        if(this.playerInfoType == "general"){
          this.getClubsForPlayer();
        }
      }
      console.log(this.data)
  }

  ngOnInit(){

    this.getCountries();
    this.getPositions();
    this.idToUpdate = this.data.id;
    this.clubName = this.data?.meta?.club_name;
    this.contact = this.data?.meta?.contact_number
    this.website = this.data?.meta?.website
    this.address = this.data?.meta?.address
    this.zipcode = this.data?.meta?.zipcode
    this.city = this.data?.meta?.city
    this.firstName = this.data?.first_name
    this.lastName = this.data?.last_name
    this.companyName = this.data?.meta?.company_name
    this.designation = this.data?.meta?.designation
    this.dob = this.data?.meta?.date_of_birth;
    this.foot = this.data?.meta?.foot;
    this.sinceInTeam = this.data?.meta?.in_team_since;
    if(this.sinceInTeam != ""){
      this.sinceInTeam = this.sinceInTeam.split(' ')[0];
    }
    this.birthPlace = this.data?.meta?.place_of_birth;
    this.contractUntil = this.data?.meta?.contract_end;
    this.speed = this.data?.meta?.top_speed;
    this.height = this.data?.meta?.height;
    this.otherPosition = this.data?.meta?.other_position;

    this.sm_x = this.data?.meta?.sm_x
    this.sm_facebook = this.data?.meta?.sm_facebook
    this.sm_instagram = this.data?.meta?.sm_instagram
    this.sm_tiktok = this.data?.meta?.sm_tiktok
    this.sm_youtube = this.data?.meta?.sm_youtube
    this.sm_vimeo = this.data?.meta?.sm_vimeo
  }

  getCountries(){
    this.userService.getCountries().subscribe(
      response => {
        if(response.status){
          this.countriesListing = response.data.countries;
          

          if(this.data.user_nationalities){
            let nationality = JSON.parse(this.data.user_nationalities);
            let countryName = nationality[0].country_name;
            let index = this.countriesListing.findIndex((x:any) => x.country_name == countryName)
            if(index >= 0){
              this.selectedCountry = this.countriesListing[index].id;
            }
          }

        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );
  }

  getPositions(){
    this.userService.getPositions().subscribe(
      response => {
        if(response.status){
          this.positionsListing = response.data.positions;
          // if(this.data.user_nationalities){
          //   let nationality = JSON.parse(this.data.user_nationalities);
          //   let countryName = nationality[0].country_name;
          //   let index = this.countriesListing.findIndex((x:any) => x.country_name == countryName)
          //   if(index >= 0){
          //     this.selectedCountry = this.countriesListing[index].id;
          //   }
          // }

        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );
  }

  getClubsForPlayer(){
    this.userService.getClubsForPlayer().subscribe(
      response => {
        if(response.status){
          this.playerClubsListing = response.data.clubs;
          // if(this.data.user_nationalities){
          //   let nationality = JSON.parse(this.data.user_nationalities);
          //   let countryName = nationality[0].country_name;
          //   let index = this.countriesListing.findIndex((x:any) => x.country_name == countryName)
          //   if(index >= 0){
          //     this.selectedCountry = this.countriesListing[index].id;
          //   }
          // }

        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );
  }

  updateClub():any {

    let formdata = new FormData();

    formdata.append('user[club_name]', this.clubName);
    formdata.append('user[city]', this.city);
    formdata.append('user[contact_number]', this.contact);
    formdata.append('user[website]', this.website);
    formdata.append('user[zipcode]', this.zipcode);
    formdata.append('user[address]', this.address);
    formdata.append('user[sm_x]', this.sm_x);
    formdata.append('user[sm_facebook]', this.sm_facebook);
    formdata.append('user[sm_instagram]', this.sm_instagram);
    formdata.append('user[sm_tiktok]', this.sm_tiktok);
    formdata.append('user[sm_youtube]', this.sm_youtube);
    formdata.append('user[sm_vimeo]', this.sm_vimeo);
    formdata.append('user[nationality][]', this.selectedCountry);

    this.userService.updateUser(this.idToUpdate, formdata).subscribe(
      response => {
        if(response.status){
          this.dialogRef.close({
            action: 'updated'
          });
        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );
  }


  updateScout():any {

    let formdata = new FormData();

    formdata.append('user[company_name]', this.companyName);
    formdata.append('user[designation]', this.designation);
    formdata.append('user[city]', this.city);
    formdata.append('user[contact_number]', this.contact);
    formdata.append('user[website]', this.website);
    formdata.append('user[zipcode]', this.zipcode);
    formdata.append('user[address]', this.address);
    formdata.append('user[sm_x]', this.sm_x);
    formdata.append('user[sm_facebook]', this.sm_facebook);
    formdata.append('user[sm_instagram]', this.sm_instagram);
    formdata.append('user[sm_tiktok]', this.sm_tiktok);
    formdata.append('user[sm_youtube]', this.sm_youtube);
    formdata.append('user[sm_vimeo]', this.sm_vimeo);
    formdata.append('user[nationality][]', this.selectedCountry);
    formdata.append('user[first_name]', this.firstName);
    formdata.append('user[last_name]', this.lastName);
    
    this.userService.updateUser(this.idToUpdate, formdata).subscribe(
      response => {
        if(response.status){
          this.dialogRef.close({
            action: 'updated'
          });
        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );    
  }

  updatePlayerPersonalInfo():any{

    // console.log(this.firstName)
    // console.log(this.lastName)
    // console.log(this.dob)

    // console.log(this.foot);
    // console.log(this.sinceInTeam);
    // console.log(this.birthPlace);
    
    // console.log(this.contractUntil);
    // console.log(this.speed);
    // console.log(this.height);
    // console.log(this.otherPosition);

    let formdata = new FormData();

    formdata.append('user[first_name]', this.firstName);
    formdata.append('user[last_name]', this.lastName);
    formdata.append('user[date_of_birth]', this.dob);
    formdata.append('user[foot]', this.foot);
    formdata.append('user[in_team_since]', this.sinceInTeam);
    formdata.append('user[place_of_birth]', this.birthPlace);

    formdata.append('user[contract_end]', this.contractUntil);
    formdata.append('user[top_speed]', this.speed);
    formdata.append('user[top_speed_unit]', '');
    formdata.append('user[height]', this.height);
    formdata.append('user[height_unit]', '');
    formdata.append('user[other_position]', this.otherPosition);

    formdata.append('user[sm_x]', this.sm_x);
    formdata.append('user[sm_facebook]', this.sm_facebook);
    formdata.append('user[sm_instagram]', this.sm_instagram);
    formdata.append('user[sm_tiktok]', this.sm_tiktok);
    formdata.append('user[sm_youtube]', this.sm_youtube);
    formdata.append('user[sm_vimeo]', this.sm_vimeo);
    formdata.append('user[nationality][]', this.selectedCountry);
    
    
    this.userService.updateUser(this.idToUpdate, formdata).subscribe(
      response => {
        if(response.status){
          this.dialogRef.close({
            action: 'updated'
          });
        }else{
          
        }
      },
      error => {
        console.error('Error publishing advertisement:', error);
      }
    );
  }

  updatePlayerGeneralInfo():any{

  }

  onDateChange(event: MatDatepickerInputEvent<Date>, type:any): void {
    const selectedDate = event.value;
    let date = this.formatDate(selectedDate);

    if(type == 'dob'){
      this.dob = date;
    }else if(type == 'sinceInTeam'){
      this.sinceInTeam = date;
    }else if(type == 'contractUntil'){
      this.contractUntil = date;
    }
  }

  formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { TalentService } from '../../../../services/talent.service';
import { EditPerformanceDetailsComponent } from '../../edit-performance-details/edit-performance-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'talent-performance-tab',
  templateUrl: './performance-tab.component.html',
  styleUrl: './performance-tab.component.scss'
})
export class PerformanceTabComponent {
  isEditing: boolean = false;
  userId:any = 71;
  performances:any = [];
  editableId: string = "";
  teams:any = [];
  dataTOBeUpdated:any = {
    coach: "",
    team_id: "",
    matches: "",
    goals: "",
    session: "",
    player_age: ""
  }
  loggedInUser:any = localStorage.getItem('userData');

  constructor(private route: ActivatedRoute, private userService: UserService,private talentService: TalentService, public dialog: MatDialog, private router: Router) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {      
      this.loggedInUser = JSON.parse(this.loggedInUser);
      this.userId = this.loggedInUser.id;
      this.getUserPerformance(this.userId);
    });
    this.getAllTeams();
  }

  
  openEditDialog(performance:any) {
    
    const dialogRef = this.dialog.open(EditPerformanceDetailsComponent, {
      width: '800px',
      data: { performance : performance , teams : this.teams}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserPerformance(this.userId);
      } else {
        console.log('User canceled the edit');
      }
    });
  }


  getUserPerformance(userId:any){
    try {
      this.talentService.getPerformanceData().subscribe((response)=>{
        if (response && response.status && response.data && response.data.performanceDetail) {
          this.editableId = "";
          this.performances = response.data.performanceDetail; 

          console.log(this.performances)
          // this.isLoading = false;
        } else {
          // this.isLoading = false;
          console.error('Invalid API response structure:', response);
        }
      });     
    } catch (error) {
      // this.isLoading = false;
      console.error('Error fetching users:', error);
    }
  }

  getAllTeams(){
    this.userService.getClubTeams(this.loggedInUser.club_id).subscribe((response)=>{
      if (response && response.status && response.data && response.data.teams) {
        this.teams = response.data.teams;
      }
    });
  }

  editPerformance(performanceId:any){
    console.log(performanceId)
    this.editableId = performanceId;
    let index = this.performances.findIndex((x:any) => x.id == performanceId);
    let currentRow = this.performances[index];

    this.dataTOBeUpdated = {
      coach: currentRow.coach,
      team_id: currentRow.team_id,
      matches: currentRow.matches,
      goals: currentRow.goals,
      session: currentRow.session,
      player_age: currentRow.player_age
    }
  }

  
  savePerformance(performanceId:any){

    // let index = this.performances.findIndex((x:any) => x.id == performanceId);
    // let teamInfo = this.getUpdatedTeamInfoToDisplay(this.dataTOBeUpdated.team_id)
    // let updatedIndexData = this.dataTOBeUpdated;
    // updatedIndexData.id = performanceId;
    // this.performances[index] = updatedIndexData;
    // console.log(JSON.stringify(this.performances))
    // this.editableId = "";
    this.userService.updatePerformance(performanceId, this.dataTOBeUpdated).subscribe((response)=>{
      // console.log(response)
      // this.editableId = "";
      if(response.status){
        this.getUserPerformance(this.userId);
      }
    }); 
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.updateRow('team_id',Number(selectElement.value));
  }

  onInputChange(event: Event, key:string): void {
    let inputElement = event.target as HTMLInputElement;
    this.updateRow(key,inputElement.value);
  }

  updateRow(key:any, value:any){
    this.dataTOBeUpdated[key] = value;
  }
}


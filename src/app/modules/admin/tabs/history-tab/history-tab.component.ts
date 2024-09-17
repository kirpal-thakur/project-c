import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrl: './history-tab.component.scss'
})
export class HistoryTabComponent {
  
  userId:any = "";
  history: any = "";
  isEditable: boolean = false;
  @Input() role: any;
  @ViewChild('historyTextarea', { static: false }) textarea!: ElementRef;
  
  constructor(private route: ActivatedRoute, private userService: UserService){

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.userId = params.id;
      this.getHistory(this.userId);
    })
  }

  getHistory(userId:any){
    try {
      this.userService.getHistory(userId).subscribe((response)=>{
        if (response && response.status && response.data) {
          this.history = response.data.company_history.meta_value; 
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

  editHistory(){
    this.isEditable = true;
  }

  updateHistory(): any{
    const history = this.textarea.nativeElement.value;

    if(history.trim() == ""){
      return false;
    }

    try {
      this.userService.updateHistory(this.userId, history).subscribe((response)=>{
        if (response && response.status && response.data) {
          this.history = history; 
          this.isEditable = false;
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
}

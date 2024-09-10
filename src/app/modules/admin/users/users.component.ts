import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { User } from './user.model';
import { UserDetailPopupComponent } from './user-detail-popup/user-detail-popup.component';
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['#','Name', 'User Type', 'Language', 'Location','Joined Date - Time','Email','Membership', 'Status','Edit'];
  
  users: User[] = [];
  checkboxIds: string[] = [];
  allSelected: boolean = false;
  userId: any; 
  newStatus: any;
  isLoading = false;
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private userService: UserService, public dialog: MatDialog) {}
  

  ngOnInit(): void {
    this.isLoading = true;
     this.fetchUsers();
  }



  async fetchUsers(): Promise<void> {
    const page = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortOrder = this.sort ? this.sort.direction : 'asc';
    const sortField = this.sort ? this.sort.active : '';

    try {
     this.userService.getUsers().subscribe((response)=>{
      if (response && response.status && response.data && response.data.userData) {
        this.users = response.data.userData; 
        this.paginator.length = response.data.totalCount;
        this.isLoading = false;
       // this.paginator.length = data.totalCount;
      } else {
        this.isLoading = false;
        console.error('Invalid API response structure:', response);
      }
      });     
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching users:', error);
    }
  }
  
  onPageChange() {
    this.fetchUsers();
  }
  selectedUserIds: number[] = [];
  
  onCheckboxChange(user: any) {
    const index = this.selectedUserIds.indexOf(user.id);
    if (index === -1) {
      this.selectedUserIds.push(user.id);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
  }

  deleteUsers(){
    console.log('selected',this.selectedUserIds);
  }
  selectAllUsers() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selectedUserIds = this.users.map(user => user.id);
    } else {
      this.selectedUserIds = [];
    }
    console.log('Selected user IDs:', this.selectedUserIds);
  }

  updateAllSelected() {
    this.allSelected = this.selectedUserIds.length === this.users.length;
  }


  getAllCheckboxIds(): string[] {
    return this.checkboxIds;
  }
  
  onUpdateUser(userId: number): void {
     console.log('Updating user with id:', userId);
    console.log('New status:', this.newStatus);
    this.userService.updateUserStatus(userId, this.newStatus).subscribe(
      response => {
        console.log('User status updated successfully:', response);
        alert('User status updated successfully!');
      },
      error => {
        console.error('Error updating user status:', error);
        alert('Error updating user status. Please try again.');
      }
    );
  }


  editUser(user:any): void {
    const dialogRef = this.dialog.open(UserDetailPopupComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
       console.log('Dialog result:', result);
      }else{
        console.log('Dialog closed without result');
      }
    });
  }

  editfilter():void {
    this.dialog.open(FilterPopupComponrnt,{
      height: '450px',
      width: '300px',
      position: {
        right: '30px',
        top:'150px'
      }
    })
  }
}

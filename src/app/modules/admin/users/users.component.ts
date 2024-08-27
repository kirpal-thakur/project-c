import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { User } from './user.model';
import { UserDetailPopupComponent } from './user-detail-popup/user-detail-popup.component';
import { FilterPopupComponrnt } from '../filter-popup/filter-popup.component';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
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
  filterDialogRef:any = ""

  customFilters:any = [];
  locations:any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private userService: UserService, public dialog: MatDialog) {}
  

  ngOnInit(): void {
    this.isLoading = true;
     this.fetchUsers();
     this.getLocations();
  }



  async fetchUsers(): Promise<void> {
    const page = this.paginator ? this.paginator.pageIndex+10 : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortOrder = this.sort ? this.sort.direction : 'asc';
    const sortField = this.sort ? this.sort.active : '';

    let params:any = {};
    params.offset = page;
    params.search = this.filterValue;
    params.limit  = pageSize;
    
    if(this.customFilters['alphabetically']){
      params.orderBy = "first_name";
      params.order = this.customFilters['alphabetically'];
    }else{
      params.orderBy = "id";
      params.order = "desc";
    }

    if(this.customFilters['membership']){
      params = {...params, "whereClause[membership]" : this.customFilters['membership']};
    }

    if(this.customFilters['role']){
      params = {...params, "whereClause[role]" : this.customFilters['role']};
    }

    if(this.customFilters['newsletter']){
      params = {...params, "whereClause[newsletter]" : this.customFilters['newsletter']};
    }

    if(this.customFilters['status']){
      params = {...params, "whereClause[status]" : this.customFilters['status']};
    }


    
    
    console.log('params');
    console.log(params);
    
    try {
    //  this.userService.getUsers(page, pageSize,this.filterValue).subscribe((response)=>{
     this.userService.getUsers(params).subscribe((response)=>{
      if (response && response.status && response.data && response.data.userData) {
        this.users = response.data.userData; 
        this.paginator.length = response.data.totalCount;
        this.isLoading = false;
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
  applyFilter(filterValue:any) {
   
    this.filterValue = filterValue.target?.value.trim().toLowerCase();
    if(this.filterValue.length >= 3){
      this.fetchUsers();
     } else if(this.filterValue.length == 0){
      this.fetchUsers();
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
    const filterDialog = this.dialog.open(FilterPopupComponrnt,{
      height: '450px',
      width: '300px',
      position: {
        right: '30px',
        top:'150px'
      },
      data: {
        filters:this.customFilters,
        locations: this.locations
      }
    })

    filterDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.applyUserFilter(result);
      //  console.log('Dialog result:', result);
      }else{
        console.log('Dialog closed without result');
      }
    });
  }

  applyUserFilter(filters:any){
    this.customFilters = filters;
    this.fetchUsers();
    console.log("applied filter others new", this.customFilters)
  }

  getLocations(){
    try {
      this.userService.getLocations().subscribe((response)=>{

        this.locations = response.data.domains;
      
      });     
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
}

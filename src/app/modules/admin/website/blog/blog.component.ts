import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlogService } from '../../../../services/blog.service';
import { BlogPopupComponent } from './blog-popup/blog-popup.component';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogs:any = [];
  displayedColumns: string[] = ['#','Name', 'Language', 'Published', 'Last Modified','Status','View all', 'Edit','Remove'];
  checkboxIds: string[] = [];
  allSelected: boolean = false;
  userId: any; 
  newStatus: any;
  isLoading:boolean = false;
  filterValue: string = '';
  filterDialogRef:any = ""
  idsToProceed: any = [];
  selectedIds:any = [];
  customFilters:any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private blogService: BlogService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBlogs();

  }

  getBlogs(filterApplied:boolean = false) {
    this.isLoading = true;
    let params:any = {};
    // params.offset = page;
    params.search = this.filterValue;
    // params.limit  = pageSize;  
    
    if(this.customFilters['discount_type']){
      params = {...params, "whereClause[discount_type]" : this.customFilters['discount_type']};
    }

    if(this.customFilters['status']){
      params = {...params, "whereClause[status]" : this.customFilters['status']};
    }

    try {
     this.blogService.getBlogs(params).subscribe((response)=>{
      if (response && response.status && response.data && response.data.blogs) {
        this.blogs = response.data.blogs; 
        // this.paginator.length = response.data.totalCount;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.blogs = [];
        console.error('Invalid API response structure:', response);
      }
      });     
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching coupons:', error);
    }
  }

  onCheckboxChange(item: any) {
    const index = this.selectedIds.indexOf(item.id);
    if (index === -1) {
      this.selectedIds.push(item.id);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }

  confirmSingleDeletion(couponId:any){
    this.idsToProceed = [couponId];
   // this.showMatDialog("", "delete-coupon-confirmation");
  }

  deactivateCoupon(couponId:any){
    let params = {id:[couponId]};
  
  }
  editBlog(element:any){
    const dialogRef = this.dialog.open(BlogPopupComponent,{
      height: '90vh',
      width: '90vw',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(result.action == "blogAdded"){
         // this.showMessage('Blog created successfully!');
          this.getBlogs();
        }
      }
    });
    // edit coupon not available in stripe
    
    // const updateCouponDialog = this.dialog.open(CoupenPopupComponent,{
    //   height: '598px',
    //   width: '600px',
    //   panelClass: 'cutam-cupen',
    //   data : {
    //     action: 'update',
    //     couponData: element
    //   }
    // });
  }


}

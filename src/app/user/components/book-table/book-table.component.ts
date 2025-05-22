import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService } from '../../../admin/services/book.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { IBook } from '../../../admin/interfaces/IBook';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from '../../../common/warning/warning.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../common/snackbar/snackbar.component';
import { style } from '@angular/animations';


@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
     MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatButtonModule,
      MatButton
    ],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent  implements OnInit{
  constructor(private _bookservice:BookService,public _dialog: MatDialog,private _snackBar: MatSnackBar) {}
  
  displayedColumns: string[] = ['bookNo', 'title', 'pages','librarian', 'status','action'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator!:MatPaginator
  totalRecords = 10
  limit = 5
  currentPage = 1;
  filterValue = '';
   durationInSeconds = 5;
 data:IBook[]  = []  
  ngOnInit(): void {
   this.loadData()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
    this.currentPage = 1; // Reset to the first page
    this.loadData();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onPageChange(event:PageEvent) {
  this.currentPage = event.pageIndex + 1
  this.loadData()
  }
  loadData() {
    this._bookservice.getAllBooks(this.currentPage,this.limit,this.filterValue).subscribe({
      next:(response)=>{
        this.dataSource = response.data as any
        this.totalRecords = response.count
      }
    })
  }
borrow(value:IBook,index:number,date = new Date()) {
  const futureDate = new Date()
   futureDate.setDate(date.getDate() + 5) 
  const obj = {
    currentDate:date,
    returnDate:futureDate,
    adminId:value.adminData._id,
    bookId:value._id
  }

  this._dialog.open(WarningComponent, {
    width: '250px',
  }).afterClosed().subscribe((value)=>{
     if(value) {
   
      this._bookservice.Borrow(obj).subscribe((data)=>{
        this.loadData()
      },(error)=>{
        console.error(error)
        this._snackBar.open(error.error.message)._dismissAfter(2000)
      })
     } else {
      return
     }
  })
} 

}
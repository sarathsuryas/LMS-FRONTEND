import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatTable, MatTableModule} from '@angular/material/table'
import { IDashboardTable } from '../../interfaces/IDashboardTable';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookService } from '../../services/book.service';
import { CreateBookDto } from '../../dtos/create.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditBookComponent } from '../edit-book/edit-book.component';






@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule, 
    MatTableModule,
    MatIcon,
   MatMenuModule,
   MatPaginatorModule,
   MatProgressSpinnerModule
  ],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.css'
})
export class DashboardTableComponent implements OnInit{

 options:string[] = ['Edit','Borrower']
 displayedColumns: string[] = ['bookNo', 'title', 'genre', 'pages','status',"action"];
 dataSource:IDashboardTable[] = [];
 totalItems = 0;
 pageSize = 5;
 currentPage = 0;
 pageSizeOptions = [5, 10, 25, 50];
 isLoading = false;

  @ViewChild(MatTable) table!: MatTable<IDashboardTable>;
  constructor(
    public _dialog: MatDialog,
    private _bookService:BookService,
    private _snackBar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loadData()
  }


  loadData() {
    this.isLoading = true;
    this._bookService.read(this.currentPage + 1, this.pageSize).subscribe({
      next:(value)=>{
        this.dataSource = value.data
        this.totalItems = value.totalCount
        setTimeout(()=>{
          this.isLoading = false;
        },2000)
      },error:(err)=>{
        this._snackBar.open(err.message,'close')
        this.isLoading = false;
      }
    })
  }

  addBook() {
    const dialogRef = this._dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('Dialog closed without data');
        return; // Exit the function early
      }
      const obj:IDashboardTable ={
        title: result.title,
        genre: result.genre,
        pages: result.pages,
        status: result.status,

        highlighted: true,
        quantity: result.quantity
      }
      const dto:CreateBookDto = {
        title: obj.title,
        genre: obj.genre,
        pages: obj.pages,
        quantity: obj.quantity
      }
      this._bookService.create(dto).subscribe({
        next:(value)=>{
          this.dataSource.pop()
          this.dataSource.unshift(obj)
          this.loadData()
          this.table.renderRows();
          this._snackBar.open(value.message,"close",{duration:2000})
          setTimeout(()=>{
            obj.highlighted = false
          },5000)
        },
        error:(err)=>{
          console.error(err)
          this._snackBar.open(err.error.message,'close',{duration:5000})
        }
      })
    });
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  };
  edit(data:{title:string,genre:string,pages:number,_id:string,status:boolean},index:number) {
     const dialogRef =  this._dialog.open(EditBookComponent,{
      data:data,
     })
     dialogRef.afterClosed().subscribe({
      next:(value)=>{
        if(value) {
          this._bookService.update(value).subscribe({
            next:(data) =>{
              this._snackBar.open(data.message,"close",{duration:2000})
              this.dataSource.splice(index,1,value)
           this.table.renderRows();
            },
            error:(err)=>{
              this._snackBar.open(err.error.message,"close",{duration:3000})
            }
          })
          
        } else {
          return
        }
      },
      error:(err)=>{
        console.error(err)
      }
     })
  } 
}

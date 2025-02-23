import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../admin/services/book.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-history-table',
  standalone: true,
  imports: [CommonModule,RouterModule, MatTableModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './book-history-table.component.html',
  styleUrl: './book-history-table.component.css'
})
export class BookHistoryTableComponent {
  displayedColumns: string[] = ['bookNo', 'title', 'librarian', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _bookService: BookService) {
    this.loadBookHistory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadBookHistory() {
    this._bookService.bookHistory().subscribe((data) => {
      this.dataSource.data = data; 
    });
  }

  // Return a book
  return(element: any) {
    console.log(element.bookData._id);
    this._bookService.return(element.bookData._id).subscribe(() => {
      this.loadBookHistory(); 
    });
  }
}



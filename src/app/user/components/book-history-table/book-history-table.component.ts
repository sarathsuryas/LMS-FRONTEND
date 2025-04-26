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
  imports: [CommonModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './book-history-table.component.html',
  styleUrls: ['./book-history-table.component.css'], // Fixed "styleUrls" property
})
export class BookHistoryTableComponent {
  displayedColumns: string[] = ['bookNo', 'title', 'librarian', 'action'];
  dataSource = new MatTableDataSource<any>();
  isReturning = false; // Track the return button state

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private _bookService: BookService) {
    this.loadBookHistory();
  }

  ngAfterViewInit() {
    this.paginator.pageSize = 10; // Set default page size
    this.dataSource.paginator = this.paginator;
  }

  // Load book history data
  loadBookHistory() {
    this._bookService.bookHistory().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error fetching book history:', err);
      },
    });
  }

  // Return a book
  return(element: BookData) {
    this.isReturning = true;
    console.log(element)

    this._bookService.return(element._id).subscribe({
    
      next: () => {
      this.isReturning = false;
        this.loadBookHistory();
      },
      error: (err) => {
        this.isReturning = false;
        console.error('Error returning book:', err);
      },
    });
  }
}

// Define the interface for book data
export interface BookData {
  _id: string;
  bookNo: string;
  title: string;
  librarian: string;
}

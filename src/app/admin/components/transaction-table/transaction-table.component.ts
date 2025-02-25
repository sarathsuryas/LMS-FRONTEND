import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule,RouterModule,MatTableModule, MatPaginatorModule],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent {
  displayedColumns: string[] = ['bookno', 'bookname', 'username', 'status'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _bookService: BookService) {
    this.fetchTransactionData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private fetchTransactionData(): void {
    this._bookService.bookTransaction().subscribe({
      next: (value) => {
        this.dataSource.data = value as any; // Set data without overwriting MatTableDataSource instance
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);

      }
    });
  }
}


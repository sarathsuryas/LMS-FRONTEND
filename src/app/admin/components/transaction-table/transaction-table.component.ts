import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule,RouterModule,MatTableModule, MatPaginatorModule,DatePipe,MatButtonModule,FormsModule],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent {
  displayedColumns: string[] = ['bookno', 'bookname', 'username', 'status','borrowed date','returned date'];
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


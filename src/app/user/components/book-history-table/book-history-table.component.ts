import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../admin/services/book.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../common/snackbar/snackbar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../common/confirm/confirm.component';
@Component({
  selector: 'app-book-history-table',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatPaginatorModule,DatePipe,MatButtonModule,],
  templateUrl: './book-history-table.component.html',
  styleUrls: ['./book-history-table.component.css'], // Fixed "styleUrls" property
})
export class BookHistoryTableComponent {
  displayedColumns: string[] = ['bookNo', 'title', 'librarian','borrowDate',"returnDate", 'action'];
  dataSource = new MatTableDataSource<any>();
  isReturning = false; // Track the return button state
    durationInSeconds = 5;
   dialougueRef!:MatDialogRef<ConfirmComponent>
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private _bookService: BookService,private _snackBar: MatSnackBar,public dialog: MatDialog) {
    this.loadBookHistory();
  }
openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  ngAfterViewInit() {
    this.paginator.pageSize = 5; // Set default page size
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
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
  return this.dialog.open(ConfirmComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Return a book
 return(element: BookData, historyId: string): void {
  this.isReturning = true; // Indicate the operation is in progress

  // Open a confirmation dialog
  const dialogRef = this.openDialog('1000', '1000');

  // Wait for the dialog to close
  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      // Proceed only if the user confirmed
      this._bookService.return(element._id, historyId).subscribe({
        next: () => {
          this.isReturning = false;
          this.loadBookHistory(); // Refresh book history
        },
        error: (err) => {
          this.isReturning = false;
          console.error('Error returning book:', err);
          // Optionally, show an error message to the user
        },
      });
    } else {
      this.isReturning = false; // Reset state if canceled
    }
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

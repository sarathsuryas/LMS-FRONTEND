import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatToolbar,
    MatSidenavModule,
    MatFormFieldModule, MatInputModule, MatTableModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();
  navItems = [
    { label: 'Books', icon: 'book', route: '/home/books' },
    { label: 'My Books', icon: 'history', route: '/home/transaction' },
    { label: 'Profile', icon: 'account_circle', route: '/home/profile' },

  ];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

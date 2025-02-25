import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/home/dashboard' },
    { label: 'Book History', icon: 'history', route: '/admin/home/history' },
    { label: 'Profile', icon: 'account_circle', route: '/admin/home/profile' },

  ];
  

  constructor() { }

  
}

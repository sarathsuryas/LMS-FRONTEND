import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  standalone: true,
imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
  styles:` :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }`
})
export class SnackbarComponent {
snackBarRef = inject(MatSnackBarRef)
}

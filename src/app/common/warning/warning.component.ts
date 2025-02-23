import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  constructor(public dialogRef: MatDialogRef<WarningComponent>) {}
  
  close(status:boolean) {
    this.dialogRef.close(status)
  }

}

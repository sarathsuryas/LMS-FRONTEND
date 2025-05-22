import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule, 
    MatDialogActions,
     MatDialogTitle, 
     MatDialogContent, 
     MatCheckboxModule, 
     FormsModule,
      MatRadioModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
checked:boolean = false;
indeterminate: any;
currentDate = new Date() 
futureDate = new Date()
  constructor(public dialogRef: MatDialogRef<WarningComponent>) {
    this.futureDate.setDate(this.currentDate.getDate() + 5)
 
  }
  
  close(status:boolean) {
    this.dialogRef.close(status)
  }

}

import { Component } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  bookForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public _dialogRef: MatDialogRef<AddBookComponent>) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      pages: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status:[true]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.bookForm.valid) {
      this._dialogRef.close(this.bookForm.value)
    }
  }
}

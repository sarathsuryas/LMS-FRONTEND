import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
     MatButtonModule,
     ReactiveFormsModule,
     MatFormFieldModule,
      MatSelectModule,
     MatInputModule
    ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

    bookForm: FormGroup;
  
   constructor(
      private fb: FormBuilder,
      public _dialogRef: MatDialogRef<EditBookComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {_id:string, title:string;pages:number,genre:string,status:boolean},
    ) {
      this.bookForm = this.fb.group({
        title: [data.title, [Validators.required]],
        genre: [data.genre, [Validators.required]],
        pages: [data.pages, [Validators.required, Validators.pattern('^[0-9]+$')]],
        status:[data.status],
        _id:[data._id]
      });
        
    }
    onSubmit() {
      if(this.bookForm.valid) {
      this._dialogRef.close(this.bookForm.value)
      }
    }

}

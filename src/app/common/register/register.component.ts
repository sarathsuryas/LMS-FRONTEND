import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { AlphabetsonlyDirective } from '../../directives/alphabetsOnly/alphabetsonly.directive';
import {  AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    AlphabetsonlyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public roles:string[] = ['Admin',"User"]
  hide = true;
  hideConfirm = true
  private _snackBar = inject(MatSnackBar);
  role = ''

  constructor(private fb:FormBuilder,private readonly _authService:AuthService,private _router:Router) { }
  registerForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: this.passwordMatchValidator } // Attach group-level validator here
  );
  
passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
      return { passwordMismatch: true };
  }
  return null;
}
register() {
   if(this.registerForm.valid) {
    this._authService.register(this.registerForm.value).subscribe({
      next:(value)=> {
          this._snackBar.open(value.message, 'close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }).afterDismissed()
           .subscribe(()=>{
            this._snackBar.open('Please Login', 'close', {
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }).afterDismissed().subscribe(()=>{
              if(this.role === 'Admin') {
                this._router.navigate(['admin'])
              } else {
                this._router.navigate([''])
              }
            })
           })
       },
       error:(err)=>{
        this._snackBar.open(err.error.message,'close',{
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
       }
      
    })
   }
}


}

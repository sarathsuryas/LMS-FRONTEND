import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
      MatIconModule,
      ReactiveFormsModule,
      MatProgressSpinnerModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;
  isLoading = false
 constructor(private _fb:FormBuilder,
  private _authService:AuthService,
  private _router:Router,
  private _matSnackbar:MatSnackBar,
  private _cookieService: CookieService
) {
  this.loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(8)]], 
  });
 }
 onSubmit() {
   if (this.loginForm.valid) {
    this.isLoading = true
    this._authService.login(this.loginForm.value).subscribe({
      next:(value)=>{
        this.isLoading = false
        this.loginForm.reset()
        this._cookieService.set('adminToken',value.token,{path:'/admin'})
        this._router.navigate(['home'])
      },
      error:(err)=>{
       this._matSnackbar.open(err.error.message,'close').afterDismissed()
       .subscribe(()=> this.isLoading = false)
      }
    })
    
  }
}
}

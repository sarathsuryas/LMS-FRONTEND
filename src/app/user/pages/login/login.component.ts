import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
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
  ngOnInit(): void {
   if(this._cookieService.get('userToken')) {
      this._router.navigate(['home/books'])
   }
  }
 onSubmit() {
   if (this.loginForm.valid) {
    this.isLoading = true
    this._authService.login(this.loginForm.value).subscribe({
      next:(value)=>{
        this.isLoading = false
        this.loginForm.reset()
        this._cookieService.set('userToken',value.token,{path:'/'})
        this._router.navigate(['home/books'])
      },
      error:(err)=>{
       this._matSnackbar.open(err.error.message,'close').afterDismissed()
       .subscribe(()=> this.isLoading = false)
      }
    })
    
  }
}
}

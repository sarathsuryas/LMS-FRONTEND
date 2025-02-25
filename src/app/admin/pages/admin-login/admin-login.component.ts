import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
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
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
 hide = true;
  loginForm!: FormGroup;
  isLoading = false
 constructor(private _fb:FormBuilder,
  private _adiminAuthService:AdminAuthService,
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
    if(localStorage.getItem('adminToken')) {
      this._router.navigate(['admin/home/dashboard'])
   }
  }
 onSubmit() {
   if (this.loginForm.valid) {     
    this.isLoading = true
    this._adiminAuthService.login(this.loginForm.value).subscribe({
      next:(value)=>{
        this.isLoading = false
        this.loginForm.reset()
        localStorage.setItem('adminToken',value.token)
        this._router.navigate(['admin/home/dashboard'])
      },
      error:(err)=>{
       this._matSnackbar.open(err.error.message,'close').afterDismissed()
       .subscribe(()=> this.isLoading = false)
      }
    })
    
  }
}
}

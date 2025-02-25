import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    CommonModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
         MatInputModule,
          MatSelectModule,
          MatButtonModule,
          ReactiveFormsModule
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {

   disabled = true;
    form!: FormGroup;
    userData!:{email:string,username:string,role:string}
    constructor(private fb: FormBuilder,
      private _adminService:AdminService,
      private _router:Router,
      private _cookieService:CookieService
    ) {
    }
    
    ngOnInit(): void {
      this._adminService.adminData().subscribe(data =>{
        this.userData = data as {email:string,username:string,role:string}
        this.form = this.fb.group({
          email: [{ value:this.userData.email, disabled: this.disabled }, [Validators.required, Validators.email]],
          username: [{ value: this.userData.username, disabled: this.disabled }, [Validators.required, Validators.minLength(3)]],
          selection: [{ value:this.userData.role, disabled: this.disabled }, Validators.required]
        });
       })
    }
  
    // Toggle between enable and disable state
    toggleEdit() {
      this.disabled = !this.disabled;
      if (this.disabled) {
        // this.form.controls['email'].disable()
        this.form.controls['username'].disable();
        this.form.controls['selection'].disable();
      } else {
        // this.form.controls['email'].enable()
        this.form.controls['username'].enable();
        this.form.controls['selection'].enable();
      }
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.toggleEdit()
        console.log('Form Data:', this.form.getRawValue());
        this._adminService.Edit(this.form.getRawValue()).subscribe()
      } else {
        console.error('Form is invalid!');
      }
    }
    logout() {
      localStorage.removeItem('adminToken')
      this._router.navigate(['admin']); 
    }
    

}

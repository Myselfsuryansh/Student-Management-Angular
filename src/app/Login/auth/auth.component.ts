import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  if (email && !email.toLowerCase().endsWith('.com')) {
    return { 'invalidEmail': true };
  }
  return null;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  SignUpForm!: FormGroup;
  LoginForm!: FormGroup;

  submitted = false;
  constructor(private fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private router: Router) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, Validators.maxLength]]
    })
  }

  ngOnInit() {
    this.SignUpForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, Validators.maxLength]]
    })


  }
  get f() {
    return this.SignUpForm.controls;

  }
  get g() {
    return this.LoginForm.controls
  }

  onSubmit() {
    console.log(this.SignUpForm.value, this.SignUpForm.valid)
    this.submitted = true;
    if (this.SignUpForm.invalid) {
      return;
    }
    let data = {
      ...this.SignUpForm.value
    }
    this.service.signUp(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Sign Up Successfully');
        this.submitted = false;
        this.SignUpForm.reset();
      }
      else {
        this.toastr.error(res.error, 'error')
      }
    })
  }

  onLogin() {
    console.log(this.LoginForm.value, this.LoginForm.valid);
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    let data = {
      ...this.LoginForm.value
    }
    this.service.LoginIn(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Login  Successfully');
        this.router.navigate(['add-student']);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userData', JSON.stringify(res.user));
        this.service.login();
        this.scheduleTokenRefresh();
        this.submitted = false;
        this.SignUpForm.reset();

      }
      else if (!res){
        this.toastr.success('Invalid password');
      }
      else {
        this.toastr.error('Invalid password')
        this.handleExpiredToken();
      }
    })
  }

  handleExpiredToken(): void {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    // Redirect user to login page or display a message
    this.router.navigate(['/login']);
    this.toastr.error('Session expired. Please log in again.', 'Error');
  }

  // Method to schedule token refresh
  scheduleTokenRefresh(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const jwtToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token

    // Calculate time remaining until token expiration
    const expiresAt = new Date(jwtToken.exp * 1000);
    const expiresInMs = expiresAt.getTime() - Date.now();

    // Schedule token refresh 1 minute before expiration (adjust as needed)
    const refreshDelayMs = expiresInMs - (1 * 60 * 1000); // 1 minute before expiration
    setTimeout(() => {
      this.refreshToken();
    }, refreshDelayMs);
  }

  // Method to refresh token
  refreshToken(): void {
    // Implement token refresh logic here (e.g., call a backend endpoint to refresh token)
    // Update localStorage with the new token if successfully refreshed
    // Handle token refresh failure gracefully
  }

  public onForgotPassword(): void {
    this.router.navigate(['/resetPassword'])
  }

}

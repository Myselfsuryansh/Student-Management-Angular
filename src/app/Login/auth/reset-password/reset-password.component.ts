import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  public submitted = false;
  public id: any;
  constructor( private service: DataService, private toastr: ToastrService, private router: Router){
   
  }
  
  public onReset() {
    const newPassword = this.resetForm.value.oldPassword;
    const confirmNewPassword = this.resetForm.value.newPassword;
    this.service.resetPassword( newPassword, confirmNewPassword).subscribe(
      (res) => {
       this.toastr.success('Password Reset successfully')
       this.router.navigate(['/'])
      
        
      },
      (error) => {
        this.toastr.error('Error')
      
      }
    );

  }

}

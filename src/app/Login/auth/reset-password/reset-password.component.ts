import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  @ViewChild('changePasswordForm', { static: false }) changePasswordForm!: NgForm;
  public submitted = false;
  public id: any;
  constructor( private service: DataService, private toastr: ToastrService, private router: Router){
   
  }
  
  public onReset() {
  const newPassword = this.changePasswordForm.value.newPassword;
  const confirmNewPassword = this.changePasswordForm.value.confirmNewPassword;

  this.service.resetPassword(newPassword,confirmNewPassword).subscribe((res)=>{
    console.log(res,'Password Reset');
    this.toastr.success('Password Reset Successfully');
    this.router.navigate(['/'])
  },(error)=>{
    console.log(error,'Error')
  })

  }

}

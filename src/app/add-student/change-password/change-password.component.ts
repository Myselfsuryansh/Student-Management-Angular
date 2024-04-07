import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  @ViewChild('passwordForm', { static: false }) passwordForm!: NgForm;
  @Output() passwordChanged = new EventEmitter<boolean>();
  public id: any;

  constructor(private service: DataService,private dialogService: DialogService,private toastr: ToastrService) {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.id = userData.id;
      console.log(this.id);
    } else {
      console.error('No userData found in local storage');
    }
  }

  changePassword() {
    const oldPassword = this.passwordForm.value.oldPassword;
    const newPassword = this.passwordForm.value.newPassword;

    this.service.changePassword(this.id, oldPassword, newPassword).subscribe(
      (res) => {
       this.toastr.success('Password changed successfully')
        this.passwordChanged.emit(true);
        
      },
      (error) => {
        this.toastr.error('Error')
        this.passwordChanged.emit(false);
      }
    );
  }
}


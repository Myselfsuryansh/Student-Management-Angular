import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, of } from 'rxjs';
import { LoaderService } from '../Service/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';


function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  if (email && !email.toLowerCase().endsWith('.com')) {
    return { 'invalidEmail': true };
  }
  return null;
}
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeData: any;
  submitted = false;
  isSaved = false;
  password1: string = '';
  confirmPass: string = '';

  constructor(private loader: LoaderService, private fb: FormBuilder, private router: Router, private service: DataService, private toastr: ToastrService, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      department: ['', Validators.required],
      empName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidator]],
      salary: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      empStatus: ['', Validators.requiredTrue],
    });

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.getEmployeeData();


    
  }
  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    if (this.employeeForm.value.empStatus == '') {
      this.toastr.error('CheckBox is not checked')
    }
    this.submitted = true;
    this.isSaved = true;
    if (this.employeeForm.invalid) {
      return;
    }

    let data = {
      ...this.employeeForm.value
    }

    this.service.postData(data).subscribe((res: any) => {

      if (res) {
        this.toastr.success('Data Added Successfully')
        this.getEmployeeData();
      }
      else {
        this.toastr.error(res.error, 'error')
      }
    })
    console.log(this.employeeForm.value);
  }


  getEmployeeData() {
    this.service.getData().subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.employeeData = res;
      }
    })
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  cancelBtn() {
    this.employeeForm.reset();
    this.toastr.success('Form Cancelled Successfully')
    if (!this.isSaved) {
      const result = window.confirm('Are your sure want to cancel? Yes or No');
      return of(result);
    }

    return of(true);


  }

  resetBtn() {
    this.employeeForm.reset();
    this.toastr.success('Form Resetted Successfully');
    if (!this.isSaved) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }

    return of(true);

  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {

      event.preventDefault();
      return false;
    } else {

      return true;
    }
  }



  goBack() {
    this.router.navigate(['/'])
  }

  password: string = '';
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onDelete(id: any) {
    if (confirm('Are you sure want to delete')) {
      this.service.delete(id).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Data Deleted Successfully');
            this.getEmployeeData();
            this.spinner.show()
          } else {
            alert('Error');
          }
        },
        (error) => {
          alert('Error occurred while deleting data');
        }
      );
    }
  }

}

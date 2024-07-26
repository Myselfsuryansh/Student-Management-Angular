import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {
  public itemId: any;
  public item: any;
  public employeeForm!: FormGroup;
  public submitted = false;

  constructor(private service: DataService, private activatedRouter: ActivatedRoute, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params: any) => {
      this.itemId = params.get('id');
      this.getDataForEdit(this.itemId);

      // this.service.getDataForSpecificID(this.itemId).subscribe((item: any) => {
      //   this.item = item;

      // })
    });

    this.employeeForm = this.fb.group({
      department: ['', Validators.required],
      empName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      empStatus: ['', Validators.requiredTrue]
    });

  };
  get f() {
    return this.employeeForm.controls;
  }


  public onUpdate() {
    if (this.employeeForm.value.empStatus == '') {
      this.toastr.error('CheckBox is not Checked')
    }
    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }
    if (this.employeeForm.valid) {
      this.service.updateData(this.itemId, this.employeeForm.value).subscribe((res: any) => {
        alert('Data updated success');
        this.router.navigate(['/add'])

      })
    }

  }
  getDataForEdit(_id: number): void {
    debugger
    this.service.getDataForSpecificID(_id).subscribe((response: any) => {
      if (response.success && response.studentId) {
        const studentData = response.studentId;
        this.employeeForm.patchValue({
          department: studentData.department,
          empName: studentData.empName,
          mobile: studentData.mobile,
          gender: studentData.gender,
          joinDate: studentData.joinDate,
          email: studentData.email,
          salary: studentData.salary,
          password: studentData.password,
          confirmPass: studentData.confirmPass,
          empStatus: studentData.empStatus
        });
      } else {
        
      }
    });
  }
  

  protected keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  protected goBack(): void {
    this.router.navigate(['/add-student'])
  }

}

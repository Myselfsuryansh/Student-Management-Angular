import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Service/data.service';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  Subject,
  Subscription,
  interval,
  of,
  takeWhile,
} from 'rxjs';
import { LoaderService } from '../Service/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';
import { MatSidenav } from '@angular/material/sidenav';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

function emailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const email: string = control.value;
  if (email && !email.toLowerCase().endsWith('.com')) {
    return { invalidEmail: true };
  }
  return null;
}
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  public id: any;
  public idout: any;
  public sidebarShow: boolean = false;
  public isDarkMode: boolean = false;
  @ViewChild('profilePopup', { static: true }) profilePopup!: TemplateRef<any>;
  nameSearch: string = '';
  selectSearch: string = '';
  employeeForm!: FormGroup;
  employeeData: any[] = [];
  submitted = false;

  isSaved = false;
  password1: string = '';
  confirmPass: string = '';
  timerInterval: any;
  isClockedIn: boolean = false;
  clockInOutText: string = 'Clock In';
  isOnBreak: boolean = false;
  private timerValuesSubject = new Subject<number>();
  public timerValues$: Observable<number> =
    this.timerValuesSubject.asObservable();
  constructor(
    private loader: LoaderService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private router: Router,
    private service: DataService,
    private Authservice: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.filteredEmployeeData = this.employeeData;
  }

  profile: any[] = [
    { value: 'Profile', viewValue: 'My Profile' },
    { value: 'ChangePassword', viewValue: 'Change Password' },
    { value: 'onSignOut', viewValue: 'Sign Out' },
  ];

  toggleStatusArray: boolean[] = this.employeeData.map(() => false);
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

  onToggleChange(index: number) {
    this.toggleStatusArray[index] = !this.toggleStatusArray[index];
  }

  sortOrder: string = 'asc';
  sortedColumn: string = '';
  sortBy(column: string): void {
    if (column !== 'department') {
      return;
    }

    if (this.sortedColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
      this.sortedColumn = column;
    }

    this.employeeData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  filteredEmployeeData!: any[];
  searchTerm: string = '';
  applyFilter() {
    this.filteredEmployeeData = this.employeeData.filter((data: any) =>
      data.empName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
  }

  itemsPerPage = 5;
  currentPage = 1;

  pagedEmployeeData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEmployeeData.slice(startIndex, endIndex);
  }
  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    if (this.employeeForm.value.empStatus == '') {
      this.toastr.error('CheckBox is not checked');
      return;
    }
    this.submitted = true;
    this.isSaved = true;
    if (this.employeeForm.invalid) {
      return;
    }
    let data = {
      ...this.employeeForm.value,
    };
    this.service.postData(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Data Added Successfully');
        this.submitted = false;
        this.getEmployeeData();
        this.employeeForm.reset();
      } else {
        this.toastr.error(res.error, 'error');
      }
    });
    console.log(this.employeeForm.value);
  }

  getEmployeeData() {
    this.service.getData().subscribe((res: any) => {
      if (res && res.getAllStudent) {
        console.log(res.getAllStudent);
        this.filteredEmployeeData = res.getAllStudent;
      }
    });
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  cancelBtn() {
    this.employeeForm.reset();
    this.submitted = false;
    this.toastr.success('Form Cancelled Successfully');
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
    var charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  password: string = '';
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onDelete(_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(_id).subscribe((res: any) => {
          if (res) {
            Swal.fire('Deleted!', 'The data has been deleted.', 'success');
            this.getEmployeeData();
          } else {
            Swal.fire('Error', 'Unable to delete the data.', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Not Cancelled', 'The data is safe :)', 'info');
      }
    });
  }

  onSignOut() {
    this.Authservice.logout();
    this.router.navigate(['/']);
  }
  newPassword!: string;
  // changePassword(): void {
  //   const email = 'Satyam5487@gmail.com'; // Replace with the actual email
  //   this.service.getUserIdByEmail(email).subscribe(userId => {
  //     // Now you have the userId, you can use it to change the password
  //     this.service.changePassword(userId, this.newPassword).subscribe(() => {
  //       console.log('Password changed successfully');
  //     }, (error) => {
  //       console.error('Error changing password:', error);
  //     });
  //   }, (error) => {
  //     console.error('Error getting user ID:', error);
  //   });
  // }

  public openChangePasswordModal(): void {
    const ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '70%',
    });

    ref.onClose.subscribe((passwordChanged: boolean) => {
      if (passwordChanged) {
        console.log('Password changed successfully');
        ref.close();
      } else {
        console.log('Password change failed');
      }
    });
  }

  openProfileModal() {
    const ref = this.dialogService.open(ProfileComponent, {
      header: 'Your Profile',
      width: '70%',
    });

    ref.onClose.subscribe((passwordChanged: boolean) => {
      ref.close();
    });
  }

  public onSubmitClockIn() {
    const data = { id: this.id };
    this.service.clockInData(data).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onSubmitClockout() {
    const data = { id: this.idout };
    this.service.clockOutData(data).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public calculateTimeDifference(start: Date, end: Date): string {
    const diffInMilliseconds = end.getTime() - start.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const hours = diffInHours % 24;
    const minutes = diffInMinutes % 60;
    const seconds = diffInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  public toggleDarkMode():void{
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
  }

  public toggleSidebar() {
    this.sidebarShow = !this.sidebarShow;
    const card = document.querySelector('.card');
    card.classList.toggle('opened', this.sidebarShow);
}
}

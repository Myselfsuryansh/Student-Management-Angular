import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { Chart, registerables } from 'node_modules/chart.js';
import { DialogService } from 'primeng/dynamicdialog';
import {
  Observable,
  ReplaySubject,
  Subject,
  of,
  take,
  takeUntil
} from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../Service/auth.service';
import { DataService } from '../Service/data.service';
import { LoaderService } from '../Service/loader.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
Chart.register(...registerables);
function emailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const email: string = control.value;
  if (email && !email.toLowerCase().endsWith('.com')) {
    return { invalidEmail: true };
  }
  return null;
}

export interface Bank {
  id: string;
  name: string;
}



/** list of banks */
export const BANKS: Bank[] = [
  {name: 'Bank A (Switzerland)', id: 'A'},
  {name: 'Bank B (Switzerland)', id: 'B'},
  {name: 'Bank C (France)', id: 'C'},
  {name: 'Bank D (France)', id: 'D'},
  {name: 'Bank E (France)', id: 'E'},
  {name: 'Bank F (Italy)', id: 'F'},
  {name: 'Bank G (Italy)', id: 'G'},
  {name: 'Bank H (Italy)', id: 'H'},
  {name: 'Bank I (Italy)', id: 'I'},
  {name: 'Bank J (Italy)', id: 'J'},
  {name: 'Bank Kolombia (United States of America)', id: 'K'},
  {name: 'Bank L (Germany)', id: 'L'},
  {name: 'Bank M (Germany)', id: 'M'},
  {name: 'Bank N (Germany)', id: 'N'},
  {name: 'Bank O (Germany)', id: 'O'},
  {name: 'Bank P (Germany)', id: 'P'},
  {name: 'Bank Q (Germany)', id: 'Q'},
  {name: 'Bank R (Germany)', id: 'R'}
];
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') className='';
  @ViewChild('profilePopup', { static: true }) profilePopup!: TemplateRef<any>;
  public barChart: Chart;
  public id: any;
  public idout: any;
  public sidebarShow: boolean = false;
  public isDarkMode: boolean = false;
  public filteredChartEmployeData=[];
  public nameSearch: string = '';
  public selectSearch: string = '';
  public employeeForm: FormGroup;
  public employeeData: any[] = [];
  public submitted = false;
  public isSaved = false;
  public password1: string = '';
  public confirmPass: string = '';
  public timerInterval: any;
  public isClockedIn: boolean = false;
  public clockInOutText: string = 'Clock In';
  public isOnBreak: boolean = false;
  public switchTheme = new FormControl(false);
  public darkClass ='.theme-dark';
  public lightClass ='.theme-light';
  private timerValuesSubject = new Subject<number>();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public dateValue: Object = new Date(new Date().setDate(14));
  currentpage: number = 1;
  limits: number = 5;
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
    private spinner: NgxSpinnerService,
    private overlay:OverlayContainer
  ) {
    this.filteredEmployeeData = this.employeeData;
   
  }

  profile: any[] = [
    { value: 'Profile', viewValue: 'My Profile' },
    { value: 'ChangePassword', viewValue: 'Change Password' },
    { value: 'onSignOut', viewValue: 'Sign Out' },
  ];

  toggleStatusArray: boolean[] = this.employeeData.map(() => false);
  protected banks: Bank[] = BANKS;

  /** control for the selected bank */
  public bankCtrl: FormControl<Bank> = new FormControl<Bank>(null);

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl<string> = new FormControl<string>('');

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
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

    this.switchTheme.valueChanges.subscribe((isDarkMode: boolean) => {
      this.toggleDarkTheme(isDarkMode);
    });

    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

      this.getAllDepartmentData(this.currentpage, this.limits);
      this.getAllEmployeeFilters(this.currentpage, this.limits)

    
   
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 0, 0, 1);
  readonly maxDate = new Date();


  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect!.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }


  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }


  protected toggleDarkTheme(isDarkMode: boolean = this.switchTheme.value) {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }


  public onToggleChange(index: number) {
    this.toggleStatusArray[index] = !this.toggleStatusArray[index];
  }

  public sortOrder: string = 'asc';
  public sortedColumn: string = '';
  sortBy(column: string): void {
    if (column !== 'department') {
      return;
    }

    if (this.sortedColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';0
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

  public filteredEmployeeData!: any[];
  private searchTerm: string = '';
  applyFilter() {
    this.filteredEmployeeData = this.employeeData.filter((data: any) =>
      data.empName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  public onPageChange(event: any): void {
    this.currentPage = event.page + 1;
  }

  public itemsPerPage = 5;
  public currentPage = 1;

  public pagedEmployeeData(): any[] {
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

  protected getEmployeeData() {
    this.service.getData().subscribe((res: any) => {
      if (res && res.getAllStudent) {
        console.log(res.getAllStudent);
        this.filteredEmployeeData = res.getAllStudent;
        this.filteredChartEmployeData= res.getAllStudent;
        this.updateChart()
      }
    });
  }
  public department:any=[]

  public getAllDepartmentData(page:number, limit:number){  
    this.service.getDepartmentData(page, limit).subscribe((data:any)=>{ 
      this.department = data.department;
    },
  error=>{
    console.error('Error fetching departments', error)
  })

  }
  public employeeFilter: any=[]

  public getAllEmployeeFilters(page:number, limit:number){
    this.service.getEmployeeData(page,limit).subscribe((data:any)=>{
      this.employeeFilter = data.employeeFilter;
    })
  }

  protected capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  public cancelBtn() {
    this.employeeForm.reset();
    this.submitted = false;
    this.toastr.success('Form Cancelled Successfully');
    if (!this.isSaved) {
      const result = window.confirm('Are your sure want to cancel? Yes or No');
      return of(result);
    }

    return of(true);
  }

  public resetBtn() {
    this.employeeForm.reset();
    this.toastr.success('Form Resetted Successfully');
    if (!this.isSaved) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }

    return of(true);
  }

  public keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public goBack() {
    this.router.navigate(['/']);
  }

  private password: string = '';
  public hidePassword: boolean = true;

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public onDelete(_id: any) {
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

  public onSignOut() {
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

  public openProfileModal() {
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

//   public toggleDarkMode():void{
//     document.body.classList.toggle('day');
//     document.body.classList.toggle('night');
//   }

  public toggleSidebar() {
    this.sidebarShow = !this.sidebarShow;
    const card = document.querySelector('.card');
    card.classList.toggle('opened', this.sidebarShow);
}


public updateChart(){
  const filteredEmployees = this.filteredEmployeeData.filter((employee: any) => {
    return employee.department === 'Administrator' || employee.department === 'Accounts';
  });
  const administratorSalaries: any[] = [];
  const accountsSalaries: any[] = [];

  console.log(this.filteredChartEmployeData,'ghghgh')
  const departmentNames = this.filteredEmployeeData.map((employee: any) => employee.department);
  console.log(departmentNames,'departmentNames')
  filteredEmployees.forEach((employee: any) => {
    if (employee.department == 'Administrator') {
      administratorSalaries.push(employee.salary);
    } else if (employee.department == 'Accounts') {
      accountsSalaries.push(employee.salary);
    }
  });

  console.log(administratorSalaries, 'administratorSalaries');
  console.log(accountsSalaries, 'accountsSalaries');

  console.log(departmentNames, 'departmentNames');
  const ctx = document.getElementById('barChart') as HTMLCanvasElement;
  this.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: departmentNames,
      datasets: [{
        label: 'Salary of an Employee',
        data: accountsSalaries,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)', 
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
}
public changeDayNight(){
}



}

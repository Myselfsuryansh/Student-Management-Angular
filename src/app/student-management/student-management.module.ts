import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentManagementRoutingModule } from './student-management-routing.module';
import { StudentManagementComponent } from './student-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { ProfileComponent } from './add-student/profile/profile.component';
import { EditStudentsComponent } from './add-student/edit-students/edit-students.component';
import { ViewStudentsComponent } from './add-student/view-students/view-students.component';
import { ChangePasswordComponent } from './add-student/change-password/change-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    StudentManagementComponent,
    AddStudentComponent,
    ProfileComponent,
    EditStudentsComponent,
    ViewStudentsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentManagementRoutingModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    PaginatorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [],
})
export class StudentManagementModule {}

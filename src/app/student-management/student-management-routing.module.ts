import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Service/auth.guard';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentsComponent } from './add-student/edit-students/edit-students.component';
import { ViewStudentsComponent } from './add-student/view-students/view-students.component';
import { StudentManagementComponent } from './student-management.component';

const routes: Routes = [
  { path: '', component: StudentManagementComponent },
  {
    path: 'add-student',
    component: AddStudentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'edit/:id', component: EditStudentsComponent },
  { path: 'view/:id', component: ViewStudentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentManagementRoutingModule {}

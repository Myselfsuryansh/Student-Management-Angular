import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentsComponent } from './add-student/edit-students/edit-students.component';
import { ViewStudentsComponent } from './add-student/view-students/view-students.component';
import { AuthComponent } from './Login/auth/auth.component';
import { AuthGuard } from './Service/auth.guard';
import { ResetPasswordComponent } from './Login/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {path:'resetPassword',component:ResetPasswordComponent},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditStudentsComponent },
  { path: 'view/:id', component: ViewStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Login/auth/auth.component';
import { ResetPasswordComponent } from './Login/auth/reset-password/reset-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'header',
    component: SidebarComponent,
    children: [
      { path: '', component: SidebarComponent }, 
      { path: 'resetPassword', component: ResetPasswordComponent },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'student', loadChildren: () => import('./student-management/student-management.module').then(m => m.StudentManagementModule) }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
